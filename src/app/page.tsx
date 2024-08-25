"use client";
import React from "react";
import { useRouter } from "next/navigation";
import LandingPage from "@/app/landing/page";


export default function Home() {
  const router = useRouter();
  
  return (
    <LandingPage />
  );
}
