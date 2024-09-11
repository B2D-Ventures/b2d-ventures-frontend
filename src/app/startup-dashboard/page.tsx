"use client";

import { useEffect, useState } from "react";
import StartupCard from "@/components/StartupCard";
import Accordian from "@/components/AccordianForStartup";
import SearchBar from "@/components/searchBar";
import ScheduleGrid from "@/components/ScheduleGrid"; // Import ScheduleGrid
import { Checkbox } from "@nextui-org/react";
import axios from "axios";



export default function DealDashboard() {

  const [deals, setDeals] = useState([]);

  const getStartupData = () => {
    axios
      .get(`http://127.0.0.1:8000/api/startup/${localStorage.getItem("userId")}/investments/`)
      .then((response) => {
        console.log(response);
        setDeals(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getStartupData();
  }, []);

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
            <StartupCard name={localStorage.getItem("userName")} totalInvestment="123,456" />
          </div>
          <div className="text-3xl mt-8">Meeting Schedule</div>
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