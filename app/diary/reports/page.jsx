"use client";

import React from "react";
import withAuth from "@/auth/withAuth"; // Import the withAuth HOC

function Reports() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-center flex items-center justify-center h-screen">
        👨‍💻 coming soon... 🚀
      </h1>
    </div>
  );
}

export default withAuth(Reports); // Wrap the component with the withAuth HOC
