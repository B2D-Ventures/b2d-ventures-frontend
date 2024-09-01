"use client";

import React from "react";
import DealCard from "@/components/card";
import Filter from "@/components/filter";
import SearchBar from "@/components/searchBar";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function DealDashboard() {
  const router = useRouter();
  const role = localStorage.getItem("userRole");

  const handleCreateDeal = () => {
    router.push("/startup-form");
  };
 
  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col px-[102px] py-[54px] gap-10">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <div className="text-[48px] font-bold">
              Investment opportunities
            </div>
            <div className="mt-1 text-[20px] text-secondary">
              Browse current investment opportunities on B2D.
            </div>
          </div>
          <div className="flex flex-col ml-auto mt-auto gap-2">
            {role === "startup" && (
              <div className="flex w-full justify-end">
                <div
                  className="flex items-center justify-center rounded-[8px] w-[144px] h-[32px] bg-purple text-white"
                  onClick={handleCreateDeal}
                >
                  Create Deal
                </div>
              </div>
            )}
            <div className="flex flex-row gap-4">
              <Filter />
              <SearchBar />
            </div>
          </div>
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
    </div>
  );
}
