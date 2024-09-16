"use client";
import { Input } from "@nextui-org/react";
import Link from "next/link";
import React, { useState } from "react";

import { AddPage } from "./add-page";

import { DotsIcon } from "@/components/icons/accounts/dots-icon";
import { InfoIcon } from "@/components/icons/accounts/info-icon";
import { TrashIcon } from "@/components/icons/accounts/trash-icon";
import { HouseIcon } from "@/components/icons/breadcrumb/house-icon";
import { SettingsIcon } from "@/components/icons/sidebar/settings-icon";
import { TableWrapper } from "@/components/table/table";

export const Pages = () => {
  const [showToast, setShowToast] = useState(false);

  const displayToast = () => {
    setShowToast(true);
  };

  return (
    <div className="my-7 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      <ul className="flex">
        <li className="flex gap-2">
          <HouseIcon />
          <Link href={"/"}>
            <span>Home</span>
          </Link>
          <span>/ </span>{" "}
        </li>

        <li className="flex gap-2">
          <Link className="flex" href={"/diary"}>
            <span> Diary</span>

            <HouseIcon />
          </Link>
          <span>/ </span>{" "}
        </li>
        <li className="flex gap-2">
          <span>Pages</span>
        </li>
      </ul>

      <h3 className="text-xl font-semibold">All Pages</h3>
      <div className="flex justify-between flex-wrap gap-4 items-center">
        <div className="flex items-center gap-3 flex-wrap md:flex-nowrap">
          <Input
            classNames={{
              input: "w-full",
              mainWrapper: "w-full",
            }}
            placeholder="Search pages"
          />
          <SettingsIcon />
          <TrashIcon />
          <InfoIcon />
          <DotsIcon />
        </div>
        <div className="flex flex-row gap-3.5 flex-wrap">
          <AddPage />

          {/* <Button color="primary" startContent={<ExportIcon />}>
            <Link href="/diary/addpage">Add new page</Link>
          </Button> */}
        </div>
      </div>
      <div className="max-w-[95rem] mx-auto w-full">
        <TableWrapper />
      </div>
    </div>
  );
};
