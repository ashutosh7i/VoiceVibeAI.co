"use client";

import React, { useState, useContext } from "react";
import { User, Tooltip, Chip } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import PageContext from "@/contexts/PageContext";
import { DeleteIcon } from "../icons/table/delete-icon";
import { EditIcon } from "../icons/table/edit-icon";
import Toast from "@/components/toast";

interface Props {
  user: {
    _id: string;
    title: string;
    description: string;
  };
  columnKey: string | React.Key;
}

export const RenderCell = ({ user, columnKey }: Props): JSX.Element => {
  const { addPageData } = useContext(PageContext);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const router = useRouter();

  const open = (user: { id: string; title: string; description: string }) => {
    const newPage = {
      id: user.id,
      title: user.title,
      description: user.description,
    };

    addPageData(newPage);
    setToastMessage("Opening Page...");
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      router.push("/diary/page");
    }, 1000);
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this page?",
    );
    if (!confirmed) return;

    try {
      const response = await fetch(`/api/diary/${user._id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      console.log(data);
      if (data.code === 200) {
        setToastMessage("Page deleted successfully.");
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 2000);
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
    } catch (error) {
      console.error("Error deleting diary page:", error);
    }
  };

  const cellValue = user[columnKey as keyof typeof user];
  return (
    <>
      {(() => {
        switch (columnKey) {
          case "name":
            return (
              <User
                avatarProps={{
                  src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
                }}
                name={cellValue}
              />
            );
          case "role":
            return (
              <div>
                <div>
                  <span>{cellValue}</span>
                </div>
              </div>
            );
          case "status":
            return (
              <Chip
                color={
                  cellValue === "active"
                    ? "success"
                    : cellValue === "paused"
                      ? "danger"
                      : "warning"
                }
                size="sm"
                variant="flat"
              >
                <span className="capitalize text-xs">{cellValue}</span>
              </Chip>
            );
          case "actions":
            return (
              <div className="flex items-center gap-4 ">
                <Tooltip color="secondary" content="Edit Page">
                  <button
                    onClick={() =>
                      open({
                        id: user._id,
                        title: user.title,
                        description: user.description,
                      })
                    }
                  >
                    <EditIcon fill="#979797" size={20} />
                  </button>
                </Tooltip>
                <Tooltip color="danger" content="Delete Page">
                  <button onClick={handleDelete}>
                    <DeleteIcon fill="#FF0080" size={20} />
                  </button>
                </Tooltip>
              </div>
            );
          default:
            return <>{cellValue}</>;
        }
      })()}
      {showToast && (
        <Toast
          message={toastMessage}
          setShow={setShowToast}
          show={showToast}
          type="success"
        />
      )}
    </>
  );
};
