"use client";

import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";

export default function Navbar() {
  const router = useRouter();
  const currentPath = usePathname();

  console.log(currentPath);

  useEffect(() => {
    if (currentPath.startsWith("/google-auth")) {
      const fullUrl = window.location.href; // Get the full URL
      router.push(`/example/selection-role?redirectUrl=${encodeURIComponent(fullUrl)}`);
    }
  }, [currentPath, router]);

  const handleLogin = () => {
    router.push("/example/login");
  };

  const handleB2DClick = () => {
    router.push("/startup");
  }

  // Return the Navbar only if the current path is not "/example/login" or "/example/selection-role"
  if (currentPath === "/example/login" || currentPath === "/example/selection-role") {
    return null;
  }

  return (
    <div className="w-full h-[90px] bg-white shadow-md flex px-[102px] items-center">
      <Image src="/images/logo.png" width={40} height={40} alt="B2D Logo" className="h-12 w-12 ml-[-12px]"/>
      <div className="text-3xl font-bold cursor-pointer" onClick={handleB2DClick}>B2D </div>
      <div
        className="text-2xl text-base ml-auto hover:cursor-pointer"
        onClick={handleLogin}
      >
        Log in
      </div>
    </div>
  );
}