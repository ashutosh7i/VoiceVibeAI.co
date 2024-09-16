import React from "react";
import { useRouter } from "next/navigation";

import { account } from "@/config/appwrite";

const LogoutButton = () => {
  const Router = useRouter();

  const handleLogout = async () => {
    await account.deleteSession("current");
    Router.replace("/");
  };

  return <button onClick={handleLogout}>Log Out</button>;
};

export default LogoutButton;
