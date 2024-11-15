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
          alert("Please ensure you are logged in as a verified investor. Please try again later.");
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
    <div className="flex items-center justify-center min-h-screen w-full">
      <div className="w-full max-w-[1440px] px-4 sm:px-6 lg:px-[102px] py-6 sm:py-8 lg:py-[54px]">
        {/* Header Section */}
        <div className="flex flex-col w-full mb-6 lg:mb-10">
          <h1 className="text-3xl sm:text-4xl lg:text-[48px] font-bold">
            Investor Dashboard
          </h1>
          <p className="mt-1 text-base sm:text-lg lg:text-[20px] text-secondary">
            Browse your current investment.
          </p>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
          {/* Left Column - Investor Card and Schedule */}
          <div className="w-full lg:w-auto">
            {/* Investor Card */}
            <div className="mb-6">
              <InvestorCard name={name} totalInvestment={parseFloat(totalInvestment)} />
            </div>

            {/* Meeting Schedule Section */}
            <div>
              <h2 className="text-2xl sm:text-3xl mb-4">Meeting Schedule</h2>
              <div className="w-full lg:w-[400px]">
                <ScheduleGrid />
              </div>
            </div>
          </div>

          {/* Right Column - Deal Information */}
          <div className="flex-1">
            {/* Search and Title Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-bold">
                Deal Information
              </h2>
              <div className="w-full sm:w-auto">
                <SearchBar onSearch={onSearch} />
              </div>
            </div>

            {/* Accordion Section */}
            <div className="h-[400px] sm:h-[450px] lg:h-[520px] overflow-y-auto">
              <Accordian deals={filteredDeals} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
