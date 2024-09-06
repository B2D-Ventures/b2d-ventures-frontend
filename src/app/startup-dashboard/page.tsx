"use client";

import React from "react";
import FormDeal from "@/components/formInput/FormDeal";
import InvestorCard from "@/components/InvestorCard";
import Accordian from "@/components/AccordianForStartup";
import SearchBar from "@/components/searchBar";
import ScheduleGrid from "@/components/ScheduleGrid"; // Import ScheduleGrid
import { Checkbox } from "@nextui-org/react";

export default function DealDashboard() {
  return (
    <div className="flex flex-col px-[102px] py-[54px] gap-10">
      <div className="flex flex-col w-full">
        <div className="text-[48px] font-bold">Startup Dashboard</div>
        <div className="mt-1 text-[20px] text-secondary">
          See and manage your investment
        </div>
      </div>
      <div className="w-full flex flex-row items-between gap-10">
        <div className="">
          <div className="flex flex-col">
            <InvestorCard name="LEXI" totalInvestment="123,456" />
          </div>
          {/* Use ScheduleGrid component */}
          <div className="text-3xl mt-2">Meeting Schedule</div>
          <ScheduleGrid />
        </div>

        <div className="flex-col w-full">
          <div className="flex flex-row justify-between">
            <div className="text-[36px] font-bold">Deal</div>
            <SearchBar />
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
  );
}