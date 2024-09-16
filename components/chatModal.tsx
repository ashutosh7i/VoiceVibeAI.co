"use client";

import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@nextui-org/react";
import Image from "next/image";
import axios from "axios";

import gojo from "@/public/gojo.png";
import naruto from "@/public/naruto.png";
import jessica from "@/public/jessica.png";
import hermione from "@/public/hermione.png";
import sukuna from "@/public/sukuna.png";

const characters = [
  { name: "Jessica", image: jessica },
  { name: "Hermione", image: hermione },
  { name: "Gojo", image: gojo },
  { name: "Naruto", image: naruto },
  { name: "Sukuna", image: sukuna },
];

export default function Chat({ user, title }: { user: string; title: string }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [message, setMessage] = useState("");
  const [character, setCharacter] = useState("Jessica");
  const [chat, setChat] = useState<Array<{ sender: string; message: string }>>(
    [],
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const savedChat = localStorage.getItem(character);

      if (savedChat) {
        setChat(JSON.parse(savedChat));
      } else {
        setChat([]);
      }
    }
  }, [isOpen, character]);

  useEffect(() => {
    localStorage.setItem(character, JSON.stringify(chat));
  }, [chat, character]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    setIsLoading(true);
    const newClientMessage = { sender: "client", message };

    setChat((prevChat) => [...prevChat, newClientMessage]);

    try {
      const response = await axios.post("/api/character_chat", {
        user,
        title,
        character,
        message,
      });

      const newServerMessage = {
        sender: "server",
        message: response.data.message,
      };

      setChat((prevChat) => [...prevChat, newServerMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      setChat((prevChat) => [
        ...prevChat,
        {
          sender: "server",
          message: "Sorry, I couldn't process your request.",
        },
      ]);
    } finally {
      setIsLoading(false);
      setMessage("");
    }
  };

  const selectCharacter = (char: string) => {
    setCharacter(char);
    const savedChat = localStorage.getItem(char);

    if (savedChat) {
      setChat(JSON.parse(savedChat));
    } else {
      setChat([]);
    }
  };

  return (
    <>
      <button
        className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        onClick={onOpen}
      >
        👩‍🦰 Ask AI
      </button>
      <Modal
        className="w-full h-full max-w-3xl dark:bg-gray-900 light:bg-gradient-to-bl light:from-red-200 light:via-red-200 light:to-yellow-200"
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent className="dark:bg-gray-800 dark:text-white">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
              <ModalBody className="flex flex-col mx-auto pt-[40px] flex-grow overflow-auto">
                <div className="flex space-x-4">
                  {characters.map((char) => (
                    <div
                      key={char.name}
                      className={`cursor-pointer p-4 bg-teal-50 dark:bg-gray-700 border-2 rounded-lg ${
                        character === char.name
                          ? "border-blue-500 dark:border-blue-300"
                          : ""
                      }`}
                      role="button"
                      tabIndex={0}
                      onClick={() => selectCharacter(char.name)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          selectCharacter(char.name);
                        }
                      }}
                    >
                      <Image
                        alt={char.name}
                        className="w-24 h-24 rounded-full mx-auto"
                        src={char.image}
                      />
                      <p className="text-center mt-2 dark:text-white">
                        {char.name}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col h-full justify-between mt-4 overflow-y-auto max-h-80 dark:bg-gray-800">
                  <div className="flex flex-col space-y-2 p-5 ">
                    {chat.map((msg, index) => (
                      <div
                        key={index}
                        className={`max-w-xs p-2 rounded-lg ${
                          msg.sender === "client"
                            ? "self-end bg-blue-200 dark:bg-blue-900"
                            : "self-start bg-gray-200 dark:bg-gray-700"
                        }`}
                      >
                        <p className="dark:text-white">
                          {msg.sender === "client" ? " " : " "}
                          {msg.message}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex mt-4">
                  <textarea
                    className="flex-grow p-2 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    disabled={isLoading}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <button
                    className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded dark:bg-blue-700 dark:hover:bg-blue-600 disabled:opacity-50"
                    disabled={isLoading || !message.trim()}
                    onClick={sendMessage}
                  >
                    {isLoading ? "Sending..." : "Send"}
                  </button>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
