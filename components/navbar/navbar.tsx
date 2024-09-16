import { Link, Navbar, NavbarContent } from "@nextui-org/react";
import React from "react";

import { FeedbackIcon } from "../icons/navbar/feedback-icon";
import { SupportIcon } from "../icons/navbar/support-icon";

import { BurguerButton } from "./burguer-button";
import { NotificationsDropdown } from "./notifications-dropdown";
import { UserDropdown } from "./user-dropdown";

import { siteConfig } from "@/config/site";

interface Props {
  children: React.ReactNode;
}

export const NavbarWrapper = ({ children }: Props) => {
  return (
    <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
      <Navbar
        isBordered
        className="w-full"
        classNames={{
          wrapper: "w-full max-w-full",
        }}
      >
        <NavbarContent className="md:hidden">
          <BurguerButton />
        </NavbarContent>
        <NavbarContent className="w-full max-md:hidden" />
        <NavbarContent
          className="w-fit data-[justify=end]:flex-grow-0"
          justify="end"
        >
          <div className="flex items-center gap-2 max-md:hidden">
            <FeedbackIcon />
            <span>
              <a href={siteConfig.links.issues}>Feedback?</a>
            </span>
          </div>

          <NotificationsDropdown />

          <div className="max-md:hidden">
            <Link href={siteConfig.links.github} target={"_blank"}>
              <SupportIcon />
            </Link>
          </div>

          <NavbarContent>
            <UserDropdown />
          </NavbarContent>
        </NavbarContent>
      </Navbar>
      {children}
    </div>
  );
};
