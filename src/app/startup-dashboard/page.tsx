"use client";

import { useEffect, useState } from "react";
import StartupCard from "@/components/StartupCard";
import Accordian from "@/components/AccordianForStartup";
import SearchBar from "@/components/searchBar";
import ScheduleGrid from "@/components/ScheduleGrid";
import axios from "axios";

interface Deal {
  attributes: {
    deal: string;
    id: string;
    investment_amount: number;
    investment_date: string;
    investor: string;
  };
}

export default function DealDashboard() {
  const [investments, setInvestments] = useState<Deal[]>([]);
  const [filteredDeals, setFilteredDeals] = useState<Deal[]>([]);
  const [userName, setUserName] = useState("");
  const [totalInvestment, setTotalInvestment] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const getStartupData = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_URI}api/startup/${localStorage.getItem("userId")}/dashboard`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log("jj", response.data.data.attributes);
      console.log(response.data.data.attributes.investments);
      setInvestments(response.data.data.attributes.investments);
      console.log("amount", response.data.data.attributes.profile.total_raised);
      setTotalInvestment(response.data.data.attributes.profile.total_raised);
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
            `${process.env.NEXT_PUBLIC_URI}api/startup/${localStorage.getItem(
              "userId"
            )}/dashboard`,
            {
              headers: {
                Authorization: `Bearer ${newAccessToken}`,
              },
            }
          );
          console.log(retryResponse.data.data.attributes.investments);
          setInvestments(retryResponse.data.data.attributes.investments);
          console.log("retry amount", retryResponse.data.data.attributes.profile.total_raised);
          setTotalInvestment(retryResponse.data.data.attributes.profile.total_raised);
        } catch (refreshError) {
          console.error("Error refreshing token:", refreshError);
          alert("Please ensure you are logged in as a verified startup. Please try again later.");
        }
      } else {
        console.error("Error fetching dashboard", error);
      }
    }
  };

  useEffect(() => {
    // Move localStorage access to useEffect to ensure it runs only on the client side
    setUserName(localStorage.getItem("userName") || "");
    getStartupData();
  }, []);

  const onSearch = (query: string) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    filterDeals();
  }, [searchQuery, investments]);

  const filterDeals = () => {
    let filtered = investments;

    // Apply search filter
    if (searchQuery !== "") {
      filtered = filtered.filter((investment) =>
        investment.attributes.deal
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
    }

    setFilteredDeals(filtered);
  };

  return (
    <div className="min-h-screen flex justify-center w-full">
      <div className="w-full max-w-[1440px] px-4 sm:px-6 lg:px-[102px] py-6 sm:py-8 lg:py-[54px]">
        {/* Header Section */}
        <div className="flex flex-col w-full mb-6 lg:mb-10">
          <h1 className="text-3xl sm:text-4xl lg:text-[48px] font-bold">
            Startup Dashboard
          </h1>
          <p className="mt-1 text-base sm:text-lg lg:text-[20px] text-secondary">
            See and manage your investment
          </p>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
          {/* Left Column - Startup Card and Schedule */}
          <div className="w-full lg:w-auto">
            {/* Startup Card */}
            <div className="mb-6">
              <StartupCard name={userName} totalInvestment={totalInvestment} />
            </div>

            {/* Meeting Schedule Section */}
            <div>
              <h2 className="text-2xl sm:text-3xl mb-4">Meeting Schedule</h2>
              <div className="w-full lg:w-[400px]">
                <ScheduleGrid />
              </div>
            </div>
          </div>

          {/* Right Column - Investment Information */}
          <div className="flex-1">
            {/* Search and Title Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start 
                          sm:items-center gap-4 mb-6">
              <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-bold">
                Investment
              </h2>
              <div className="w-full sm:w-auto">
                <SearchBar onSearch={onSearch} />
              </div>
            </div>

            {/* Accordion Section */}
            <div className="h-[400px] sm:h-[450px] lg:h-[520px] overflow-y-auto 
                          scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              <Accordian deals={filteredDeals} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}