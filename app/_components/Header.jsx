import Image from 'next/image';
import React from 'react';
import { Button } from "@/components/ui/button"; // Make sure this import is correct

function Header() {
  return (
    <div className="px-10 lg:px-32 xl:px-40 2xl:px-56 p-4 flex justify-between items-center shadow-sm">
      <Image src="/logo.svg" alt="logo" width={50} height={100} />
      <Button>Get Started</Button>
    </div>
  );
}

export default Header;
