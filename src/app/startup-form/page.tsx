"use client";

import React from "react";
import FormDeal from "@/components/formInput/FormDeal";

export default function DealDashboard() {
  return (
    <div className="flex flex-col px-[102px] py-[54px] gap-10">
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
  );
}
