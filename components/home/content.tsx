"use client";
import React from "react";
import dynamic from "next/dynamic";
import { Link } from "@nextui-org/react";
import NextLink from "next/link";

import { TableWrapper } from "../table/table";

import { CardAgents } from "./card-agents";

import { siteConfig } from "@/config/site";

const Chart = dynamic(
  () => import("../charts/steam").then((mod) => mod.Steam),
  {
    ssr: false,
  },
);

export const Content = () => (
  <div className="h-full lg:px-6">
    <div className="flex justify-center gap-4 xl:gap-6 pt-3 px-4 lg:px-0  flex-wrap xl:flex-nowrap sm:pt-10 max-w-[90rem] mx-auto w-full">
      <div className="mt-6 gap-6 flex flex-col w-full">
        {/* Chart */}
        <div className="h-full flex flex-col gap-2">
          <h3 className="text-xl font-semibold">Mood Analysis</h3>
          <div className="w-full bg-default-50 shadow-lg rounded-2xl p-6 ">
            <Chart />
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="mt-4 gap-2 flex flex-col xl:max-w-sm w-full">
        <h3 className="text-xl font-semibold">Section</h3>
        <div className="flex flex-col justify-center gap-4 flex-wrap md:flex-nowrap md:flex-col">
          <CardAgents />
        </div>
      </div>
    </div>

    {/* Table Latest Users */}
    <div className="flex flex-col justify-center w-full py-5 px-4 lg:px-0  max-w-[90rem] mx-auto gap-3">
      <div className="flex  flex-wrap justify-between">
        <h3 className="text-center text-xl font-semibold">Your Pages</h3>
        <Link
          as={NextLink}
          className="cursor-pointer"
          color="primary"
          href={siteConfig.links.pages}
        >
          View All
        </Link>
      </div>
      <TableWrapper />
    </div>
  </div>
);
