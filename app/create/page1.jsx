import { Suspense } from "react";
import CreateLogo from "./CreateLogo";
// import page

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CreateLogo />
    </Suspense>
  );
}
