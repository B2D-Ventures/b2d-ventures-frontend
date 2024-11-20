"use client";

import AdminCard from "@/components/adminCardForManagement";
import Accordian from "@/components/AccordainForAdmin";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

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
        {/* Back Button */}
        <button
          onClick={() => router.push("/admin-approve")}
          className="group mb-2 flex items-center gap-2 text-[#9710FF] hover:text-[#8109df] 
                     transition-all duration-300 ease-in-out transform hover:-translate-x-1"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={2} 
            stroke="currentColor" 
            className="w-5 h-5 transition-transform duration-300 ease-in-out group-hover:scale-110"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" 
            />
          </svg>
          <span className="relative after:content-[''] after:absolute after:w-full after:h-0.5 
                          after:bg-[#8109df] after:left-0 after:bottom-0 after:origin-left 
                          after:scale-x-0 hover:after:scale-x-100 after:transition-transform 
                          after:duration-300 after:ease-in-out">
            Back to Approve Deal
          </span>
        </button>

        {/* Header Section */}
        <div className="flex flex-col w-full">
          <h1 className="text-3xl md:text-4xl lg:text-[48px] font-bold 
                        hover:text-[#9710FF] transition-colors duration-300">
            Admin management
          </h1>
          <p className="mt-2 text-base md:text-[20px] text-secondary">
            Manage startup deal.
          </p>
        </div>

        {/* Main Content Section */}
        <div className="w-full flex flex-col lg:flex-row items-start gap-5 lg:gap-10">
          {/* Admin Card Section */}
          <div className="w-full lg:w-auto transition-transform duration-300 hover:scale-105">
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
              className="h-[400px] lg:h-[520px] overflow-y-auto duration-300" 
              data-testid="accordian-deal"
            >
              <Accordian deals={recentDeals}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}