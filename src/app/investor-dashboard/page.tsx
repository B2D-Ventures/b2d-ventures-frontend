"use client";

import { useState, useEffect } from "react";
import InvestorCard from "@/components/InvestorCard";
import Accordian from "@/components/Accordian";
import SearchBar from "@/components/searchBar";
import ScheduleGrid from "@/components/ScheduleGrid";
import axios from "axios";

interface Deal {
  attributes: {
    id: string;
    name: string;
    description: string;
    target_amount: number;
    amount_raised: string;
    investor_count: number;
    image_logo_url: string;
    image_content_url: string;
    type: string;
  };
}

export default function DealDashboard() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [filteredDeals, setFilteredDeals] = useState<Deal[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [name, setName] = useState("");
  const [totalInvestment, setTotalInvestment] = useState<string>("");

  useEffect(() => {
    const userName = localStorage.getItem("userName");
    setName(userName ? userName : "");
    fetchDashboard();
  }, []);

  useEffect(() => {
    filterDeals();
  }, [selectedFilter, searchQuery, deals]);

  const filterDeals = () => {
    let filtered = deals;

    // Apply type filter
    if (selectedFilter !== "") {
      filtered = filtered.filter(
        (deal) => deal.attributes.type === selectedFilter
      );
    }

    // Apply search filter
    if (searchQuery !== "") {
      filtered = filtered.filter((deal) =>
        deal.attributes.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredDeals(filtered);
  };

  const fetchDashboard = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.get<{ data: any }>(
        `${process.env.NEXT_PUBLIC_URI}api/investor/${localStorage.getItem(
          "userId"
        )}/dashboard`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(
        "Dashboard fetched:",
        response.data.data.attributes.active_deals
      );
      setDeals(response.data.data.attributes.active_deals);
      setTotalInvestment(response.data.data.attributes.total_invested);
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        // Token expired, try to refresh
        try {
          const refreshToken = localStorage.getItem("refreshToken");
          const refreshResponse = await axios.post(
            `${process.env.NEXT_PUBLIC_URI}api/auths/refresh-token/`,
            {
              data: {
                attributes: {
                  "refresh-token": refreshToken,
                },
              },
            }
          );

          const newAccessToken = refreshResponse.data.data.access;
          localStorage.setItem("accessToken", newAccessToken);

          // Retry the original request with the new access token
          const retryResponse = await axios.get<{ data: any }>(
            `${process.env.NEXT_PUBLIC_URI}api/investor/${localStorage.getItem(
              "userId"
            )}/dashboard`,
            {
              headers: {
                Authorization: `Bearer ${newAccessToken}`,
              },
            }
          );
          console.log(
            "Dashboard fetched:",
            refreshResponse.data.data.attributes.active_deals
          );
        } catch (refreshError) {
          console.error("Error refreshing token:", refreshError);
          alert(
            "Session expired or you are not logged in. Please log in again."
          );
        }
      } else {
        console.error("Error fetching dashboard", error);
      }
    }
  };

  const onSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col px-[102px] py-[54px] gap-10 w-[1440px]">
        <div className="flex flex-col w-full">
          <div className="text-[48px] font-bold">Investor Dashboard</div>
          <div className="mt-1 text-[20px] text-secondary">
            Browse your current investment.
          </div>
        </div>
        <div className="w-full flex flex-row items-between gap-10">
          <div className="">
            <div className="flex flex-col">
              <InvestorCard name={name} totalInvestment={totalInvestment} />
            </div>
            <div className="text-3xl mt-8">Meeting Schedule</div>
            <ScheduleGrid />
          </div>
          <div className="flex-col w-full">
            <div className="flex flex-row justify-between">
              <div className="text-[36px] font-bold">Deal Information</div>
              <SearchBar onSearch={onSearch} />
            </div>
            <div className="h-[520px] overflow-y-auto">
              <Accordian deals={filteredDeals} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
