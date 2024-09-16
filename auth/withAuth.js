"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import styles from "./Loading.module.css"; // Import the CSS module

import { account } from "@/config/appwrite";
import "./Loading.module.css";
import Animation from "@/auth/Animation";

const withAuth = (WrappedComponent) => {
  const AuthenticatedComponent = () => {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);
    const Router = useRouter();

    const getAccount = async () => {
      try {
        const accountData = await account.get();

        // console.log(accountData);
        await account.listSessions(); // Removed unused 'result' variable

        setUser(accountData);
      } catch (error) {
        //console.log(error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      getAccount();
    }, []);

    useEffect(() => {
      if (!loading && !user) {
        Router.replace("/login");
      }
    }, [loading, user]);

    if (loading) {
      return (
        <div className={styles.loading}>
          <span className={styles.box}>
            🔐 Authenticating <Animation />
          </span>
        </div>
      );
    }

    if (user) {
      return <WrappedComponent />;
    }

    return null;
  };

  AuthenticatedComponent.displayName = "AuthenticatedComponent";

  return AuthenticatedComponent;
};

export default withAuth;
