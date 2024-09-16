import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarItem,
} from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import Logout from "@/auth/Logout";
import { account } from "@/config/appwrite";

export const UserDropdown = () => {
  const [user, setUser] = useState();

  const getAccount = async () => {
    try {
      const accountData = await account.get();
      setUser(accountData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAccount();
  }, []);

  return (
    <Dropdown>
      <NavbarItem>
        <DropdownTrigger>
          <Avatar as="button" color="secondary" size="md" />
        </DropdownTrigger>
      </NavbarItem>
      <DropdownMenu
        aria-label="User menu actions"
        onAction={(actionKey) => console.log({ actionKey })}
      >
        <DropdownItem
          key="profile"
          className="flex flex-col justify-start w-full items-start"
        >
          <p>hello {user?.name.split(" ")[0]}👋</p>
          <p>{user?.email}</p>
        </DropdownItem>
        <DropdownItem key="system">Profile</DropdownItem>
        <DropdownItem key="settings">My Settings</DropdownItem>
        <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
        <DropdownItem key="logout" color="danger" className="text-danger ">
          <Logout />
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
