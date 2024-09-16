"use client";
// components/AddPage.js
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import React, { useState, useContext } from "react";
import { useRouter } from "next/navigation";

import PageContext from "@/contexts/PageContext";
import Toast from "@/components/toast";

export const AddPage = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [showToast, setShowToast] = useState(false);
  const { addPageData } = useContext(PageContext);
  const router = useRouter();

  const handleCreate = () => {
    // dont let the user create a page without a title and description
    if (!title || !description) {
      alert("Please enter a title and description");
      return;
    }
    const newPage = {
      title,
      description,
      datetime: new Date().toISOString(),
    };

    addPageData(newPage);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      router.push("/diary/addpage");
      onOpenChange();
    }, 3700);
  };

  return (
    <div>
      <Button color="primary" onPress={onOpen}>
        ➕ Create New Page
      </Button>
      <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                ➕ Create New Page
              </ModalHeader>
              <ModalBody>
                <Input
                  label="Title"
                  value={title}
                  variant="bordered"
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
                <Input
                  label="Description"
                  value={description}
                  variant="bordered"
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onClick={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={handleCreate}>
                  Create
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Toast
        message="Item Created Successfully!"
        setShow={setShowToast}
        show={showToast}
        type="success"
      />
    </div>
  );
};
