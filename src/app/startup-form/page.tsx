"use client";

import React from "react";
import FormDeal from "@/components/formInput/FormDeal";

export default function DealDashboard() {
  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col px-[102px] py-[54px] gap-10 w-[1440px]">
        <div className="flex flex-col w-full">
          <div className="text-[48px] font-bold">Create Deal</div>
          <div className="mt-1 text-[20px] text-secondary">
            Browse current investment opportunities on B2D.
          </div>
        </div>
        <div className="w-full">
          <FormDeal />
        </div>
      </div>
    </div>
  );
}
