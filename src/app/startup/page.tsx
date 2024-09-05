"use client";

import React, { useEffect, useState } from "react";
import DealCard from "@/components/card";
import Filter from "@/components/filter";
import SearchBar from "@/components/searchBar";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function DealDashboard() {
  const router = useRouter();
  const role = localStorage.getItem("userRole");
  const [deals, setDeals] = useState([]);

  const handleCreateDeal = () => {
    router.push("/startup-form");
  };

  const fetchDeals = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/admin/deals");
      setDeals(response.data.data);
      console.log("Deals fetched:", response.data.data);
    } catch (error) {
      console.error("Error fetching deals:", error);
    }
  };

  useEffect(() => {
    fetchDeals();
  }, []);

  const handleDealClick = (dealId: string) => {
    router.push(`/detail-deal/${dealId}`);
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
          {deals.map((deal) => (
            <div onClick={() => handleDealClick(deal.attributes.id)}>
              <DealCard
                key={deal.attributes.id}
                name={deal.attributes.name}
                description={deal.attributes.description}
                fundingGoal={parseFloat(deal.attributes.allocation)}
                raisedAmount={parseFloat(deal.attributes.raised)}
                investorNumber={deal.attributes.investor_count}
                icon={deal.attributes.image_logo_url}
                bgImage={deal.attributes.image_content_url}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
