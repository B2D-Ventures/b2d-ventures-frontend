"use client";

import React from "react";
import AdminCard from "@/components/adminCardForManagement";
import Accordian from "@/components/AccordainForAdmin";
import SearchBar from "@/components/searchBar";
import { Checkbox } from "@nextui-org/react";

export default function DealDashboard() {
  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col px-[102px] py-[54px] gap-10 w-[1440px]">
        <div className="flex flex-col w-full">
          <div className="text-[48px] font-bold">Startup management</div>
          <div className="mt-1 text-[20px] text-secondary">
          Manage and approve startup deal.
          </div>
        </div>
        <div className="w-full flex flex-row items-between gap-10">
          <div className="">
            <div className="flex flex-col">
                <AdminCard totalStartup="456" />
            </div>
          </div>
          <div className="flex-col w-full">
            <div className="flex flex-row justify-between">
              <div className="text-[36px] font-bold">Deal Information</div>
              {/* <SearchBar /> */}
            </div>
            <div className="flex flex-row justify-start gap-2">
              <div className="text-[24px] text-secondary">All</div>
              <Checkbox
                classNames={{
                  wrapper:
                    "flex justify-center items-center bg-white border-[1px] rounded-[8px] text-white text-[20px]",
                  label: "ml-2 text-secondary",
                  icon: "text-purple",
                }}
              >
                Approve
              </Checkbox>
              <Checkbox
                classNames={{
                  wrapper:
                    "flex justify-center items-center bg-white border-[1px] rounded-[8px] text-white text-[20px]",
                  label: "ml-2 text-secondary",
                  icon: "text-purple",
                }}
              >
                Funded
              </Checkbox>
            </div>
            <div className="h-[520px] overflow-y-auto">
              <Accordian />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
