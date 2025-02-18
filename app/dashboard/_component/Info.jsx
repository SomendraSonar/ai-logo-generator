"use client";


import { UserDetailContex } from "@/app/_context/UserDetailContext";
import React, { useContext } from "react";
import Link from "next/link";

function Info() {
  const { userDetail, setUserDetail } = useContext(UserDetailContex);

  return (
    <div>
      <div className="flex justify-between items-center mt-20">
        <h2 className="font-bold text-3xl text-primary">
          Hello, {userDetail?.name}
        </h2>
      </div>
      <div className="flex justify-between items-center mt-4 ">
        <h2 className="font-bold text-2xl">Dashboard</h2>
        <Link href="/create"><button className="bg-primary bordered rounded text-light">+ Create New Logo</button></Link>
      </div>
    </div>
  );
}

export default Info;