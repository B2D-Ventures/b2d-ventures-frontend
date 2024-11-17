"use client";

import AdminCard from "@/components/adminCardForManagement";
import Accordian from "@/components/AccordainForAdmin";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Import the useRouter hook
import { Button } from "@nextui-org/react"; // Import Button from your UI library

export default function DealDashboard() {
  const [total_invested, setTotalInvestment] = useState<string>("");
  const [recentDeals, setRecentDeals] = useState<any[]>([]);
  const router = useRouter(); // Initialize the router

  const fetchDashboard = async () => {
    try {
      const response = await axios.get<{ data: any }>(
        `${process.env.NEXT_PUBLIC_URI}api/admin/dashboard/`
      );
      console.log("Dashboard fetched:", response.data);
      const dealResponse = await axios.get<{ data: any }>(
        `${process.env.NEXT_PUBLIC_URI}api/admin/deals/`
      );
      console.log("Deals fetched:", dealResponse.data);
      setTotalInvestment(response.data.data.attributes.statistics.total_investments);
      setRecentDeals(dealResponse.data.data);
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
            </div>
            <div className="h-[520px] overflow-y-auto" data-testid="accordian-deal">
              <Accordian deals={recentDeals}/>
            </div>
            {/* Add the Back to Approve Deal button here */}
            <div className="mt-4">
              <Button
                onClick={() => router.push("/admin-approve")}
                color="primary"
              >
                Back to Approve Deal
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}