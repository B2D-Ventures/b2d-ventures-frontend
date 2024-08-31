"use client";

import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import axios from "axios";

export default function Navbar() {
  const router = useRouter();
  const currentPath = usePathname();

  console.log(currentPath);

  useEffect(() => {
    if (currentPath.startsWith("/google-auth")) {
      // Get the full URL
      const fullUrl = window.location.href;
      // create user
      axios
        .post(
          "http://127.0.0.1:8000/api/auths/",
          {
            data: {
              attributes: {
                full_url: fullUrl,
                role: "unassigned",
              },
            },
          },
          {
            headers: {
              "Content-Type": "application/vnd.api+json",
            },
          }
        )
        .then((response) => {
          console.log("User created:", response.data);
          const userRole = response.data.data.attributes.role;
          const userId = response.data.data.attributes.id;
          // If the role is not admin, investor, or startup, redirect to selection-role page
          if (!["admin", "investor", "startup"].includes(userRole)) {
            console.log(`User does not have a role: ${userRole}`);
            router.push(`/example/selection-role?user=${encodeURIComponent(userId)}`);
          } else {
            // If the role is admin, investor, or startup, you can redirect to a different page or do nothing
            console.log(`User already has a role: ${userRole}`);
            router.push(`/startup?user=${encodeURIComponent(userId)}&role=${userRole}`);
          }
        })
        .catch((error) => {
          console.log("Error creating user:", error);
        });
    }
  }, [currentPath, router]);

  const handleLogin = () => {
    router.push("/example/login");
  };

  const handleB2DClick = () => {
    router.push("/startup");
  };

  // Return the Navbar only if the current path is not "/example/login" or "/example/selection-role"
  if (
    currentPath === "/example/login" ||
    currentPath === "/example/selection-role"
  ) {
    return null;
  }

  return (
    <div className="w-full h-[90px] bg-white shadow-md flex px-[102px] items-center">
      <Image
        src="/images/logo.png"
        width={40}
        height={40}
        alt="B2D Logo"
        className="h-12 w-12 ml-[-12px]"
      />
      <div
        className="text-3xl font-bold cursor-pointer"
        onClick={handleB2DClick}
      >
        B2D{" "}
      </div>
      <div
        className="text-2xl text-base ml-auto hover:cursor-pointer"
        onClick={handleLogin}
      >
        Log in
      </div>
    </div>
  );
}
