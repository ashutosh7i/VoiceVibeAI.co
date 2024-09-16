"use client";

import React from "react";

import { Pages } from "@/components/pages";
import withAuth from "@/auth/withAuth"; // Import the withAuth HOC

const pages = () => {
  return <Pages />;
};

export default withAuth(pages); // Wrap the pages component with withAuth
