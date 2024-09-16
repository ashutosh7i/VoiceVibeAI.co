"use client";
// contexts/PageContext.js
import React, { createContext, useState, useEffect } from "react";

const PageContext = createContext();

export const PageProvider = ({ children }) => {
  const [pageData, setPageData] = useState(() => {
    if (typeof window !== "undefined") {
      const savedPages = localStorage.getItem("pages");

      return savedPages ? JSON.parse(savedPages) : [];
    }

    return [];
  });

  useEffect(() => {
    localStorage.setItem("pages", JSON.stringify(pageData));
  }, [pageData]);

  const addPageData = (newPage) => {
    setPageData((prevPages) => [...prevPages, newPage]);
  };

  return (
    <PageContext.Provider value={{ pageData, addPageData }}>
      {children}
    </PageContext.Provider>
  );
};

export default PageContext;
