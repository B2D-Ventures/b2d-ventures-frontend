"use client";

import React from "react";

export default function Navbar({}) {
  return (
    <div className="w-full h-[90px] bg-white shadow-md flex px-[102px] items-center">
      <div className="text-3xl font-bold">B2D</div>
      <div
        className="text-2xl text-base ml-auto"
        onClick={() => console.log("log in")}
      >
        Log in jaaa
      </div>
    </div>
  );
}
