"use client";

import React, { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";

import { OAuthProvider } from "appwrite";
import { account } from "@/config/appwrite";

const HomePage = () => {
  const [hostname, setHostname] = useState("");

  useEffect(() => {
    setHostname(window.location.hostname);
  }, []);
  console.log(`http://${hostname}/diary`);
  return (
    <div className="flex justify-center items-center min-h-screen flex-col dark:bg-gray-800">
      <h1 className="text-2xl font-bold text-white dark:text-gray-200">
        Welcome! Please sign in to continue
      </h1>{" "}
      <br />
      <div className="mt-5">
        <button
          className="flex justify-center items-center gap-2 border-2 border-slate-600 px-5 py-2 rounded-sm"
          onClick={() => {
             account.createOAuth2Session(
               OAuthProvider.Google,
               `http://${hostname}/diary`, // Success URL
               `http://${hostname}`, // Failure URL
               ["profile", "email"] // Scopes
             );
            //
            // account.createOAuth2Session(OAuthProvider.Google)
            //
            //account.createOAuth2Session(
            //OAuthProvider.Google, // provider
            //'voicevibeai.co/diary', // redirect here on success
            // 'https://example.com/failed', // redirect here on failure
            //['profile', 'email'] // scopes (optional)
            //);
            //
          }}
        >
          <FcGoogle size={30} />
          <span className="text-white dark:text-gray-200">
            Login with Google
          </span>
        </button>
      </div>
    </div>
  );
};

export default HomePage;
