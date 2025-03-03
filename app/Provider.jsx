"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./_components/Header";
import { useUser } from "@clerk/nextjs";
import { UserDetailContext } from "./_context/UserDetailContext";

function Provider({ children }) {
  const { user } = useUser();
  const [userDetail, setUserDetail] = useState(null); // Initialize with `null` for safety

  useEffect(() => {
    if (user) {
      CheckUserAuth();
    }
  }, [user]);

  // Save user data
  const CheckUserAuth = async () => {
    try {
      const result = await axios.post("/api/user", {
        userName: user?.fullName,
        userEmail: user?.primaryEmailAddress?.emailAddress,
      });
      console.log(result.data);
      setUserDetail(result.data);
    } catch (error) {
      console.error("Error in CheckUserAuth:", error);
    }
  };

  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      <Header />
      <div className="px-10 lg:px-32 xl:px-40 2xl:px-56">{children}</div>
    </UserDetailContext.Provider>
  );
}

export default Provider;
