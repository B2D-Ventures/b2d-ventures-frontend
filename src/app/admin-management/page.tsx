"use client";

import AdminCard from "@/components/adminCardForManagement";
import Accordian from "@/components/AccordainForAdmin";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";

export default function DealDashboard() {
  const [total_invested, setTotalInvestment] = useState<string>("");
  const [recentDeals, setRecentDeals] = useState<any[]>([]);
  const router = useRouter();

  const fetchDashboard = async () => {
    try {
      const response = await axios.get<{ data: any }>(
        `${process.env.NEXT_PUBLIC_URI}api/admin/dashboard/`
      );
      const dealResponse = await axios.get<{ data: any }>(
        `${process.env.NEXT_PUBLIC_URI}api/admin/deals/`
      );
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
    <div className="flex items-center justify-center w-full min-h-screen">
      <div className="flex flex-col px-4 sm:px-6 md:px-8 lg:px-[102px] py-6 md:py-[54px] gap-5 md:gap-10 w-full max-w-[1440px]">
        {/* Header Section */}
        <div className="flex flex-col w-full">
          <h1 className="text-3xl md:text-4xl lg:text-[48px] font-bold">
            Admin management
          </h1>
          <p className="mt-2 text-base md:text-[20px] text-secondary">
            Manage startup deal.
          </p>
        </div>

        {/* Main Content Section */}
        <div className="w-full flex flex-col lg:flex-row items-start gap-5 lg:gap-10">
          {/* Admin Card Section */}
          <div className="w-full lg:w-auto">
            <div className="flex flex-col items-center justify-center">
              <AdminCard totalStartup={total_invested} />
            </div>
          </div>

          {/* Deal Information Section */}
          <div className="flex-col w-full">
            <div className="flex flex-row justify-between items-center mb-4">
              <h2 className="text-2xl md:text-3xl lg:text-[36px] font-bold">
                Deal Information
              </h2>
            </div>

            {/* Accordian Section */}
            <div 
              className="h-[400px] lg:h-[520px] overflow-y-auto" 
              data-testid="accordian-deal"
            >
              <Accordian deals={recentDeals}/>
            </div>

            {/* Back Button Section */}
            <div className="mt-4">
              <Button
                onClick={() => router.push("/admin-approve")}
                color="primary"
                className="w-full sm:w-auto"
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