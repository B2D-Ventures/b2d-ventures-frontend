"use client";
import React from "react";
import Image from "next/image";

import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const handleOnclick = () => {
    router.push("/startup");
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row h-[600px] bg-gradient-to-b from-purple to-[#4E0A81]">
        <div className="flex flex-col w-full items-start justify-center px-[135px]">
          <div className="text-white text-[48px] font-bold mb-8">
            Be a part of the world's most ambitious ventures
          </div>
          <div className="text-white text-[24px] mb-8">
            B2D’s financial ecosystem unlocks private markets for investors and
            institutions across the globe.
          </div>
          <div
            className="flex items-center justify-center w-[292px] h-[71px] bg-purple text-white text-[32px] rounded-[8px] cursor-pointer"
            onClick={handleOnclick}
          >
            Start investing
          </div>
        </div>
        <Image
          src="/images/landing.png"
          width={500}
          height={500}
          alt="landing"
          className="h-full ml-auto"
        />
      </div>
      <div className="flex flex-row items-center justify-center h-[220px] bg-white gap-10">
        <div className="flex flex-col items-start justify-center">
          <div className="text-[32px] font-bold">3M+</div>
          <div className="text-[24px]">Global investor community</div>
        </div>
        <div className="w-[1px] h-[114px] bg-secondary"></div>
        <div className="flex flex-col items-start justify-center">
          <div className="text-[32px] font-bold">2,500+</div>
          <div className="text-[24px]">Ventures supported</div>
        </div>
        <div className="w-[1px] h-[114px] bg-secondary"></div>
        <div className="flex flex-col items-start justify-center">
          <div className="text-[32px] font-bold">32</div>
          <div className="text-[24px]">Unicorns in portfolio</div>
        </div>
      </div>
      <div className="flex items-center justify-center text-white h-[120px] bg-[#4E0A81]">
        Private investments are highly risky, illiquid and may result in total
        loss of capital. Learn more
      </div>
    </div>
  );
}
