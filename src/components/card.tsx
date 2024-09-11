"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function DealCard({}) {
  const router = useRouter();
  const handleOnclick = () => {
    router.push("/detail-deal");
  };

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
        <div className="mt-2 grid grid-cols-2">
          <div className="w-full">
            <div className="flex">
              <div className="text-base font-semi-bold">$123,456 raised</div>
            </div>
            <div className="flex">
              <div className="text-base font-semi-bold">175 investors</div>
            </div>
          </div>
          <div className="mt-2 ml-auto">
          <button 
            className="w-[105px] h-[32px] flex bg-purple rounded-md items-center justify-center text-white text-center hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-colors duration-200"
            onClick={handleOnclick}
          >
            FUNDED
          </button>
        </div>
        </div>
      </div>
    </div>
  );
}
