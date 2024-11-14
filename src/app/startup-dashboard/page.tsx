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
        `${process.env.NEXT_PUBLIC_URI}api/startup/${localStorage.getItem(
          "userId"
        )}/dashboard`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response.data.data.attributes.investments);
      setInvestments(response.data.data.attributes.investments);
      setTotalInvestment(response.data.data.attributes.profile.total_amount_raised);
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
          setTotalInvestment(
            retryResponse.data.data.attributes.profile.total_raised
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
            <StartupCard name={userName} totalInvestment={totalInvestment} />
          </div>
          <div className="text-3xl mt-8">Meeting Schedule</div>
          <ScheduleGrid />
        </div>

        <div className="flex-col w-full">
          <div className="flex flex-row justify-between">
            <div className="text-[36px] font-bold">Investment</div>
            <SearchBar onSearch={onSearch} />
          </div>
          <div className="h-[520px] overflow-y-auto">
            <Accordian deals={filteredDeals} />
          </div>
        </div>
      </div>
    </div>
  );
}
