"use client";

import React from "react";
import Image from "next/image";

interface DealCardProps {
  name: string;
  description: string;
  fundingGoal: number;
  raisedAmount: number;
  investorNumber: number;
  icon: string;
  bgImage: string;
  type: string;
}

function fundingGoalFormat(amount: number) {
  return (amount / 1000000).toLocaleString();
}

const API_BASE_URL = `${process.env.NEXT_PUBLIC_URI}`;
const DEFAULT_BG_IMAGE = "/images/lexi.png";
const DEFAULT_ICON_IMAGE = "/images/icon.jpg";

const typeColorMap: { [key: string]: { bg: string; text: string } } = {
  "Renewable Energy": { bg: "bg-teal-100", text: "text-teal-600" },
  "Biotechnology": { bg: "bg-blue-100", text: "text-blue-600" },
  "Artificial Intelligence": { bg: "bg-violet-100", text: "text-violet-600" },
  "Sustainable Fashion": { bg: "bg-pink-100", text: "text-pink-600" },
  "Space Exploration": { bg: "bg-indigo-100", text: "text-indigo-600" },
  "Healthcare": { bg: "bg-rose-100", text: "text-rose-600" },
  "Education Technology": { bg: "bg-fuchsia-100", text: "text-fuchsia-600" },
  "Quantum Computing": { bg: "bg-cyan-100", text: "text-cyan-600" },
  "Water Technology": { bg: "bg-sky-100", text: "text-sky-600" },
  "Neuroscience AI": { bg: "bg-amber-100", text: "text-amber-600" },
  "Agriculture Technology": { bg: "bg-lime-100", text: "text-lime-600" },
  "Environmental Technology": { bg: "bg-emerald-100", text: "text-emerald-600" },
};

export default function DealCard({
  name,
  description,
  fundingGoal,
  raisedAmount,
  investorNumber,
  icon,
  bgImage,
  type,
}: DealCardProps) {
  const getImageSrc = (imagePath?: string, isIcon: boolean = false) => {
    if (!imagePath) return isIcon ? DEFAULT_ICON_IMAGE : DEFAULT_BG_IMAGE;
    const fullPath = imagePath.startsWith("http")
      ? imagePath
      : `${API_BASE_URL}${imagePath}`;
    return fullPath;
  };

const typeColors = typeColorMap[type] || { bg: "bg-gray-100", text: "text-gray-600" };

  return (
    <div className="w-[380px] h-[560px] rounded-md bg-white shadow-md relative flex flex-col">
      <Image
        src={getImageSrc(bgImage)}
        alt="deal card"
        className="w-full min-h-[260px] max-h-[260px] object-cover rounded-t-md"
        width={380}
        height={260}
      />
      <div className="p-6 flex flex-col flex-grow">
        <div className="absolute top-[220px] w-[80px] h-[80px] overflow-hidden drop-shadow-md flex items-center justify-center rounded-md">
          <Image
            src={getImageSrc(icon)}
            alt="icon"
            width={80}
            height={80}
            className="rounded-md object-contain"
          />
        </div>
        <div className="mt-6">
          <div className="text-2xl font-24px line-clamp-2 overflow-hidden font-bold">{name}</div>
          <div className="text-base mb-6 line-clamp-2 overflow-hidden text-ellipsis">
            {description}
          </div>
        </div>
      
        <div className="flex flex-col mt-auto">
          <div className="mt-1">
            <span className={`px-2 py-1 rounded-md text-sm ${typeColors.bg} ${typeColors.text}`}>
              {type}
            </span>
          </div>
          <div className="mt-2 flex items-center">
            <div className="text-base text-secondary">Funding goal</div>
            <div className="text-base ml-auto">
              ${fundingGoalFormat(fundingGoal)}M
            </div>
          </div>
          <div className="mt-2 grid grid-cols-2">
            <div className="w-full">
              <div className="flex">
                <div className="text-base font-semi-bold">
                  $ {raisedAmount.toLocaleString()} raised
                </div>
              </div>
              <div className="flex">
                <div className="text-base font-semi-bold">
                  {investorNumber} investments
                </div>
              </div>
            </div>
            <div className="mt-2 ml-auto">
              <div className="w-[105px] h-[32px] flex bg-purple rounded-md items-center justify-center">
                <div className="text-white text-center">FUND</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}