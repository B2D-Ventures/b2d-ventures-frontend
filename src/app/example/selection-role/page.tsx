"use client";
import React from "react";

import { useRouter } from "next/navigation";
const HomePage = () => {

  const router = useRouter();

  // const createUser = () => {
  //   fetch
  // }

  const handleInvestor = () => {
    router.push("/startup");
  };

  return (
    <div>
      <div
        className="flex h-screen items-center justify-center"
        style={{
          background: "linear-gradient(to right, #FFFFFF 50%, #4E0A81 50%)",
        }}
      > 
        <div
          className="bg-white rounded-lg shadow-lg border-2 border-[#D9D9D9]"
          style={{ width: "1288px", height: "631px" }}
        >
          <div className="flex h-full">
            <div className="flex-1 bg-white text-center mt-12 mb-12">
              <div className="inline-block space-x-2 mb-24">
                <p className="text-[#625B71] text-4xl font-bold inline">
                  Please select
                </p>
                <p className="text-[#000000] text-4xl font-bold inline">
                  your Role
                </p>
              </div>
              <div className="flex-col items-center justify-center">
                <div className="my-12">
                  <button className="bg-[#FFFFFF] text-[#000000] py-2 px-6 rounded-xl border-2 border-[#D9D9D9] shadow-md hover:shadow-lg w-1/5 font-medium"
                  onClick={handleInvestor}
                  >
                    INVESTOR
                  </button>
                </div>
                <div className="my-12">
                  <button className="bg-[#FFFFFF] text-[#000000] py-2 px-6 rounded-xl border-2 border-[#D9D9D9] shadow-md hover:shadow-lg w-1/5 font-medium"
                  onClick={handleInvestor}
                  >
                    STARTUP
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
