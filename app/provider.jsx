
"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./_components/Header";
import { useUser } from "@clerk/nextjs";
// import {USerDetailContex} from
// import { UserDetailContex } from "./_context/UserDetailContext";
import { UserDetailContex } from "./_context/UserDetailContext";

function Provider({ children }) {
  const { user } = useUser();
  const [userDetail, setUserDetail] = useState();

  // Define the function before useEffect so it's available when needed.
  async function checkUserAuth() {
    try {
      const result = await axios.post("/api/users", {
        userName: user?.fullName,
        userEmail: user?.primaryEmailAddress?.emailAddress,
      });
      console.log(result.data);
      setUserDetail(result.data);
    } catch (error) {
      console.error("Error in checkUserAuth:", error);
    }
  }

  useEffect(() => {
    if (user) {
      checkUserAuth();
    }
  }, [user]);

  return (
    <>
    <UserDetailContex.Provider value={{userDetail,setUserDetail}}>
      <Header />
      <div className="px-10 lg:px-32 xl:px-40 2xl:px-56">
        {children}
      </div>
      </UserDetailContex.Provider>
    </>
    
  );
}

export default Provider;
