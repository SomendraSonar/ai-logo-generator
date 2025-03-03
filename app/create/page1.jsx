"use client";
export const dynamic = "force-dynamic";

import React, { Suspense } from "react";
import CreateLogo from "./CreateLogo";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CreateLogo />
    </Suspense>
  );
}
