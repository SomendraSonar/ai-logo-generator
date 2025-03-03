"use client";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const CreateLogo = dynamic(() => import("./CreateLogo"), { ssr: false });

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CreateLogo />
    </Suspense>
  );
}
