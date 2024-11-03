"use client";

import AdminCard from "@/components/adminCardForManagement";
import Accordian from "@/components/AccordainForAdmin";
import { Checkbox } from "@nextui-org/react";
import axios from "axios";
import { useState } from "react";


export default function DealDashboard() {
  const [total_invested, setTotalInvestment] = useState<string>("");
  const [recentDeals, setRecentDeals] = useState<any[]>([]);

  const fetchDashboard = async () => {
    try {
      const response = await axios.get<{ data: any }>(
        `http://127.0.0.1:8000/api/admin/dashboard/`
      );

      console.log("Dashboard fetched:", response.data);
      setTotalInvestment(response.data.data.attributes.statistics.total_investments);
      setRecentDeals(response.data.data.attributes.recent_deals);
      // setFilteredDeals(response.data.data);
      // console.log("Deals fetched:", response.data.data);
    } catch (error) {
      console.error("Error fetching deals:", error);
    }
  };

  useState(() => {
    fetchDashboard();
  });

  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col px-[102px] py-[54px] gap-10 w-[1440px]">
        <div className="flex flex-col w-full">
          <div className="text-[48px] font-bold">Admin management</div>
          <div className="mt-1 text-[20px] text-secondary">
          Manage startup deal.
          </div>
        </div>
        <div className="w-full flex flex-row items-between gap-10">
          <div className="">
            <div className="flex flex-col">
                <AdminCard totalStartup={total_invested} />
            </div>
          </div>
          <div className="flex-col w-full">
            <div className="flex flex-row justify-between">
              <div className="text-[36px] font-bold">Deal Information</div>
              {/* <SearchBar /> */}
            </div>
            <div className="flex flex-row justify-start gap-2">
              {/* <div className="text-[24px] text-secondary">All</div> */}
              {/* <Checkbox
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
              </Checkbox> */}
            </div>
            <div className="h-[520px] overflow-y-auto">
              <Accordian deals={recentDeals} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
