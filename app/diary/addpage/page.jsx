"use client";
import React, { useState, useEffect, useRef, useContext } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import ChatModal from "@/components/chatModal";
import axios from "axios";
import Emotion from "@/components/Emotion";
import PageContext from "@/contexts/PageContext";
import { account } from "@/config/appwrite";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

// Custom Scrollable Text Area Component
const ScrollableTextArea = ({ text }) => {
  return (
    <div className="left-0">
      <div className="scrollable-text-area">
        <p>{text}</p>
      </div>
    </div>
  );
};

export default function AddPage() {
  const router = useRouter();
  const { pageData } = useContext(PageContext);
  const { title, description } = pageData[pageData.length - 1] || {};

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState([]);

  useEffect(() => {
    const getAccount = async () => {
      try {
        const accountData = await account.get();
        setUser(accountData);
      } catch (error) {
        //console.log(error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    getAccount();
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && user?.email) {
      const savedText = window.localStorage.getItem(user.email) || "";
      setText(savedText.split("\n"));
    }
  }, [user?.email]);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [loading, user, router]);

  const [recognizing, setRecognizing] = useState(false);
  const [infoMessage, setInfoMessage] = useState("Click and start speaking.");
  const [emotions, setEmotions] = useState([]);
  const interimText = useRef("");
  const recognition = useRef(null);
  const [isComponentMounted, setIsComponentMounted] = useState(false);
  const debounceTimer = useRef(null);

  const debounceSave = (value) => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      if (typeof window !== "undefined" && user?.email) {
        window.localStorage.setItem(user.email, value);
        exportText();
      }
    }, 1000);
  };

  const exportText = () => {
    const savedText =
      typeof window !== "undefined"
        ? window.localStorage.getItem(user?.email)
        : "";

    const data = {
      title: title,
      description: description,
      text: savedText,
      user: user?.email,
      emotions,
    };
    //console.log("Data:", data);

    axios
      .post("/api/diaryupdatepage", data)
      .then((res) => {
        //console.log("Server response:", res.data);
      })
      .catch((error) => {
        console.error("There was an error storing the data!", error);
      });

    // Make another API call after 2 seconds
    setTimeout(() => {
      axios
        .post("/api/predict_sentiment", {
          user: user?.email,
          title: title,
        })
        .then((response) => {
          const predictedEmotions = response.data.emotion.emotions;
          setEmotions(predictedEmotions);
          //console.log("Server response:", predictedEmotions);
        })
        .catch((error) => {
          console.error("There was an error predicting the sentiment!", error);
        });
    }, 2000);
  };

  const downloadTextAsFile = () => {
    alert("available in pro version😂");
  };

  useEffect(() => {
    setIsComponentMounted(true);
  }, []);

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) {
      setInfoMessage(
        "Web Speech API is not supported by this browser. Upgrade to Chrome version 25 or later.",
      );
    } else {
      recognition.current = new window.webkitSpeechRecognition();
      recognition.current.continuous = true;
      recognition.current.interimResults = true;

      recognition.current.onstart = () => {
        setRecognizing(true);
        setInfoMessage("Speak now.");
        interimText.current = ""; // Clear interim text on start
      };

      recognition.current.onerror = (event) => {
        if (event.error === "no-speech") {
          setInfoMessage(
            "No speech was detected. You may need to adjust your microphone settings.",
          );
        } else if (event.error === "audio-capture") {
          setInfoMessage(
            "No microphone was found. Ensure that a microphone is installed and that microphone settings are configured correctly.",
          );
        } else if (event.error === "not-allowed") {
          setInfoMessage("Permission to use microphone was denied.");
        }
      };

      recognition.current.onend = () => {
        setRecognizing(false);
        setInfoMessage("Click Start to start speaking."); // Update info message
      };

      recognition.current.onresult = (event) => {
        let finalText = "";
        const newLines = []; // Store final text lines

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalText += event.results[i][0].transcript;
            newLines.push(finalText); // Add final text as a new line
            finalText = ""; // Reset for next final result
          } else {
            interimText.current += event.results[i][0].transcript;
          }
        }

        // Update text state and local storage with final lines
        setText((prevText) => [...prevText, ...newLines]);
        debounceSave(text.join("\n"));
      };
    }
  }, [text, user?.email, debounceSave]); // Update effect on text changes (for potential edge cases)

  const startRecognition = () => {
    if (recognizing) {
      recognition.current.stop();
      return;
    }
    recognition.current.lang = "en-US"; // You can set the language dynamically as needed
    recognition.current.start();
    setInfoMessage('Click the "Allow" button above to enable your microphone.');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <section className="flex flex-col gap-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-3xl">
        <h2 className="text-2xl font-bold text-center dark:text-white">
          {title}
        </h2>
        <h3 className="text-center">{description}</h3>

        <div className="flex justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={startRecognition}
          >
            {recognizing ? "🛑 Stop Recording" : "🎙️ Start Recording"}
          </button>
          <div className="text-center mt-4 text-gray-600 dark:text-gray-300">
            {infoMessage}
          </div>
          <ChatModal title={title} user={user?.email} />
        </div>

        <div className="mb-2">
          <div className="w-full overflow-x-auto whitespace-nowrap">
            <div className="h-8 flex items-center">
              <span className="text-base dark:text-white">
                {isComponentMounted && (
                  <ScrollableTextArea
                    id="interim-text"
                    text={interimText.current}
                  />
                )}{" "}
              </span>
            </div>
          </div>
          <ReactQuill
            className="pt-2"
            value={text.join("\n")}
            onChange={(value) => {
              setText(value.split("\n"));
              debounceSave(value);
            }}
            style={{ height: "250px" }}
            defaultValue={"Start speaking..."}
          />{" "}
          <br />
          <br />
          <button onClick={downloadTextAsFile}>Download Text</button>
        </div>
        <br />
        <div>{emotions && <Emotion emotions={emotions} />}</div>
      </section>
    </div>
  );
}
