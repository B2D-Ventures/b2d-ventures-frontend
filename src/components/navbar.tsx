"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const currentPath = usePathname();

  const handleLogin = () => {
    router.push("/example/login");
  };

  // Return the Navbar only if the current path is not "/example/login"
  if (currentPath === "/example/login") {
    return null;
  }

  return (
    <div className="w-full h-[90px] bg-white shadow-md flex px-[102px] items-center">
      <div className="text-3xl font-bold">B2D</div>
      <div
        className="text-2xl text-base ml-auto hover:cursor-pointer"
        onClick={handleLogin}
      >
        Log in
      </div>
    </div>
  );
}