"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import axios from "axios";

export default function Navbar() {
  const router = useRouter();
  const currentPath = usePathname();
  const [userName, setUserName] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  console.log(currentPath);

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    if (storedUserName) {
      setUserName(storedUserName);
    }
    
    if (currentPath.startsWith("/google-auth")) {
      // Get the full URL
      const fullUrl = window.location.href;
      console.log("fullurl", fullUrl);
      // create user
      axios
        .post(
          `${process.env.NEXT_PUBLIC_URI}api/auths/`,
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
          const userName = response.data.data.attributes.username;
          const accessToken = response.data.data.jwt_tokens.jwt_access_token;
          const refreshToken = response.data.data.jwt_tokens.jwt_refresh_token;

          // Store user name in local storage
          localStorage.setItem("userName", userName);
          localStorage.setItem("userId", userId);
          localStorage.setItem("userRole", userRole);
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);
          setUserName(userName);

          // If the role is not admin, investor, or startup, redirect to selection-role page
          if (!["admin", "investor", "startup"].includes(userRole)) {
            console.log(`User does not have a role: ${userRole}`);
            router.push(
              `/example/selection-role?user=${encodeURIComponent(userId)}`
            );
          } else {
            // If the role is admin, investor, or startup, you can redirect to a different page or do nothing
            console.log(`User already has a role: ${userRole}`);
            router.push(
              `/startup?user=${encodeURIComponent(userId)}&role=${userRole}`
            );
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

  const handleLogout = () => {
    localStorage.removeItem("userName");
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUserName(null);
    alert("You have been logged out.");
  }

  const handleB2DClick = () => {
    router.push("/startup");
  };

  // Return the Navbar only if the current path is not "/example/login" or "/example/selection-role"
  if (
    currentPath === "/example/login" ||
    currentPath === "/example/selection-role" ||
    currentPath === "/admin-approve-investor" ||
    currentPath === "/admin-dashboard" ||
    currentPath === "/admin-management" ||
    currentPath === "/admin-approve" ||
    currentPath === "/admin-login" 
  ) {
    return null;
  }

  const handleProfileCLick = () => {
    if (localStorage.getItem("userRole") === "startup") {
      router.push("/startup-dashboard");
    }
    if (localStorage.getItem("userRole") === "investor") {
      router.push("/investor-dashboard");
    }
    if (localStorage.getItem("userRole") === "admin") {
      router.push("/admin-dashboard");
    }
  }

  function formatRole(role: string): string {
    switch (role.toLocaleLowerCase()) {
      case "investor":
        return "Investor";
      case "startup":
        return "Startup";
      case "pending_startup":
        return "Startup (pending)";
      case "pending_investor":
        return "Investor (pending)";
      default:
        return "Unassigned";
    }
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="w-full bg-white shadow-md">
      {/* Main Navbar */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[102px]">
        <div className="flex justify-between items-center h-[70px] sm:h-[80px] lg:h-[90px]">
          {/* Logo Section */}
          <div className="flex items-center space-x-2">
            <Image
              src="/images/logo.png"
              width={40}
              height={40}
              alt="B2D Logo"
              className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12"
            />
            <div
              className="text-lg sm:text-2xl lg:text-3xl font-bold cursor-pointer"
              onClick={handleB2DClick}
            >
              B2D
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {userName ? (
              <>
                <div 
                  className="text-base lg:text-md cursor-pointer hover:text-purple"
                  onClick={handleProfileCLick}
                >
                  Welcome, {userName}
                </div>
                <div className="text-base lg:text-md text-purple">
                  Role: {formatRole(localStorage.getItem("userRole") as string)}
                </div>
                <div 
                  className="text-base lg:text-md text-secondary hover:cursor-pointer"
                  onClick={handleLogout}
                >
                  Log out
                </div>
              </>
            ) : (
              <div
                className="text-base lg:text-lg hover:cursor-pointer"
                onClick={handleLogin}
              >
                Log in
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-md hover:bg-gray-100 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 pt-2 pb-3 space-y-3">
            {userName ? (
              <>
                <div 
                  className="block px-3 py-2 text-base font-medium hover:text-purple"
                  onClick={handleProfileCLick}
                >
                  Welcome, {userName}
                </div>
                <div className="block px-3 py-2 text-base font-medium text-purple">
                  Role: {formatRole(localStorage.getItem("userRole") as string)}
                </div>
                <div 
                  className="block px-3 py-2 text-base font-medium text-secondary hover:cursor-pointer"
                  onClick={handleLogout}
                >
                  Log out
                </div>
              </>
            ) : (
              <div
                className="block px-3 py-2 text-base font-medium hover:cursor-pointer"
                onClick={handleLogin}
              >
                Log in
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}