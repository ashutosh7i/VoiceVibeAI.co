"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";

import { RenderCell } from "./render-cell";
import React, { useState, useEffect } from "react";
import Logout from "@/auth/Logout";
import { account } from "@/config/appwrite";
import { useRouter } from "next/navigation";
import axios from "axios";

export const TableWrapper = () => {
  const [diaryPages, setDiaryPages] = useState([]);
  const [user, setUser] = useState();
  const router = useRouter();

  useEffect(() => {
    const fetchUserAndDiaryPages = async () => {
      try {
        const accountData = await account.get();

        setUser(accountData as any);

        const response = await axios.post(`/api/diary/${accountData.email}`);
        const data = await response.data;

        setDiaryPages(data.reverse());
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserAndDiaryPages();
  }, []);

  const columns = [
    { name: "TITLE", uid: "title" },
    { name: "DESCRIPTION", uid: "description" },
    { name: "DATE", uid: "date" },
    { name: "ACTIONS", uid: "actions" },
  ];

  return (
    <div className="w-full flex flex-col gap-4">
      <Table aria-label="Example table with custom cells">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              hideHeader={column.uid === "actions"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={diaryPages}>
          {(item) => (
            <TableRow key={(item as any)._id}>
              {(columnKey) => (
                <TableCell>
                  <RenderCell user={item} columnKey={columnKey} />
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
