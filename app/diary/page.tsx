"use client";

import type { NextPage } from "next";

import { Providers } from "./providers";

import { Content } from "@/components/home/content";
import withAuth from "@/auth/withAuth"; // Import the withAuth HOC

const Home: NextPage = () => {
  return (
    <Providers>
      <Content />
    </Providers>
  );
};

export default withAuth(Home); // Wrap the Home component with withAuth
