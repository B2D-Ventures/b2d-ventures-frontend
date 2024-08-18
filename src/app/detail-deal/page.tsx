"use client";

import React from "react";
import DetailCard from "@/components/DetailCard";
import Image from "next/image";

export default function DealDashboard() {
  return (
    <div className="flex flex-col px-[102px] py-[54px] gap-10">
      <div className="flex flex-col">
        <div className="flex flex-row gap-4 items-center">
          <div className="rounded-[8px] overflow-hidden shadow-sm">
            <Image
              src="/images/icon.jpg"
              width={48}
              height={48}
              alt="logo"
              className="w-[60px] h-[60px]"
            />
          </div>
          <div className="text-[48px] font-bold">LEXI</div>
        </div>
        <div className="mt-1 text-[20px] text-secondary">
          Wireless Building Automation: Cost-effective Energy Management &
          Decarbonization
        </div>
      </div>

      <div className="flex flex-row justify-between">
        <div className="flex flex-col w-[793px]">
          <Image
            src="/images/lexi.png"
            width={793}
            height={412}
            alt="image"
            className="w-full h-[412px] rounded-[8px]"
          />
          <div className="mt-4">
            <h2 className="text-[20px] font-bold">Highlights</h2>
            <ul className="list-disc ml-8 mt-5 text-secondary">
              <li>\$3.3M in cumulative revenue, \$5.5M in funding to date</li>
              <li>
                \$375K in confirmed 2024 bookings, \$679K forecast for 2024
              </li>
              <li>
                Customers include Patrizia(\$60B AUM), Rheem(\$6B rev),
                Crane(\$3B rev)
              </li>
              <li>
                Utilizing AI Automated Energy Management to address Climate
                Mandates
              </li>
              <li>
                UBS forecasts that \$15T will be spent by 2050 on climate
                building retrofits
              </li>
              <li>
                UBS states that 90% of all commercial buildings will need to be
                retrofitted
              </li>
            </ul>
          </div>
        </div>
        <div className="flex ">
          <DetailCard />
        </div>
      </div>
    </div>
  );
}
