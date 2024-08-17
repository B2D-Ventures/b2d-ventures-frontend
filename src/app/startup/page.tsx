"use client";

import React from "react";
import DealCard from "@/components/card";

export default function DealDashboard() {
  return (
    <div className="flex flex-col px-[102px] py-[54px] gap-10">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col">
          <div className="text-[48px] font-bold">Investment opportunities</div>
          <div className="mt-1 text-[20px] text-secondary">Browse current investment opportunities on B2D.</div>
        </div>
        <div className="flex flex-col">Investment opportunities</div>
      </div>
      <div className="grid grid-cols-3 gap-12">
        <DealCard />
        <DealCard />
        <DealCard />
        <DealCard />
        <DealCard />
        <DealCard />
      </div>
      
    </div>
  );
}
