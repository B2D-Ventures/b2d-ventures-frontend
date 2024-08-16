"use client";

import React from "react";
import Image from "next/image";

export default function DealCard({}) {
  return (
    <div className="w-[380px] h-[520px] rounded-md bg-white shadow-md relative">
      <Image
        src="/images/lexi.png"
        alt="deal card"
        className="w-full min-h-[260px] object-cover rounded-t-md"
        width={380}
        height={260}
      />
      <div className="p-6">
        <div className="absolute top-[220px] shadow-md rounded-md w-[80px] h-[80px] overflow-hidden">
          <Image
            src="/images/icon.jpg"
            alt="icon"
            width={80}
            height={80}
            className="w-full object-cover"
          />
        </div>
        <div className="mt-6">
          <div className="text-2xl font-24px font-bold">Lexi</div>
          <div className="text-base ">
            Wireless Building Automation: Cost-effective Energy Management &
            Decarbonization
          </div>
        </div>
        <div className="mt-2 flex items-center">
          <div className="text-base text-secondary">Funding goal</div>
          <div className="text-base ml-auto">$500k</div>
        </div>
        <div className="mt-2">
          <div className="flex">
            <div className="text-base font-bold">$123,456</div>
            <div className="text-base ml-auto">raised</div>
          </div>
          <div className="flex">
            <div className="text-base font-bold">175</div>
            <div className="text-base ml-auto">investors</div>
          </div>
        </div>
        <div className="mt-4">
          <button className="bg-purple-500 text-white px-4 py-2 rounded-md">
            FUNDED
          </button>
        </div>
      </div>
    </div>
  );
}
