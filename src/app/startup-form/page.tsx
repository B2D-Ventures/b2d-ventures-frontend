"use client";

import React from "react";
import FormDeal from "@/components/formInput/FormDeal";

export default function DealDashboard() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col px-6 py-10 gap-10 w-full max-w-4xl">
        <div className="flex flex-col w-full">
          <div className="text-4xl font-bold">Create Deal</div>
          <div className="mt-1 text-lg text-secondary">
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
