"use client";
import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const router = useRouter();

  const changeRole = async (role: string) => {
    const userToken = localStorage.getItem("userId");

    if (!userToken) {
      console.error("User token not found in URL");
      return;
    }

    try {
      console.log("user token:", userToken);
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_URI}api/auths/${userToken}/update-role/`,
        {
          data: {
            attributes: {
              role: role,
            },
          },
        },
        {
          headers: {
            "Content-Type": "application/vnd.api+json",
          },
        }
      );
      console.log("Role changed successfully:", response.data);
      localStorage.setItem("userRole", role);
      router.push(`/startup?user=${encodeURIComponent(userToken)}&role=${role}`);
    } catch (error) {
      console.error("Error changing role:", error);
    }
  };

  const handleInvestor = () => {
    changeRole('pending_investor');
  };

  const handleStartup = () => {
    changeRole('pending_startup');
  };

  return (
    <div className="min-h-screen w-full">
      <div 
        className="flex min-h-screen items-center justify-center"
        style={{
          background: "linear-gradient(to right, #FFFFFF 50%, #4E0A81 50%)",
        }}
      >
        <div 
          className="bg-white rounded-lg shadow-lg border-2 border-[#D9D9D9] w-[90%] md:w-[80%] lg:w-[1288px] h-[500px] md:h-[550px] lg:h-[631px]"
        >
          <div className="flex h-full">
            <div className="flex-1 bg-white text-center">
              {/* Header Section */}
              <div className="mt-12 lg:mt-24 mb-12 lg:mb-24">
                <span className="text-[#625B71] text-2xl md:text-3xl lg:text-4xl font-bold">
                  Please select{' '}
                </span>
                <span className="text-[#000000] text-2xl md:text-3xl lg:text-4xl font-bold">
                  your Role
                </span>
              </div>

              {/* Buttons Section */}
              <div className="flex flex-col items-center justify-center space-y-8 lg:space-y-12">
                <div className="w-full">
                  <button
                    className="bg-[#FFFFFF] text-[#000000] py-3 px-8 rounded-xl 
                             border-2 border-[#D9D9D9] shadow-md hover:shadow-lg 
                             w-[200px] md:w-[250px] lg:w-[300px]
                             text-base md:text-lg lg:text-xl font-medium
                             transition-all duration-300"
                    onClick={handleInvestor}
                  >
                    INVESTOR
                  </button>
                </div>

                <div className="w-full">
                  <button
                    className="bg-[#FFFFFF] text-[#000000] py-3 px-8 rounded-xl 
                             border-2 border-[#D9D9D9] shadow-md hover:shadow-lg 
                             w-[200px] md:w-[250px] lg:w-[300px]
                             text-base md:text-lg lg:text-xl font-medium
                             transition-all duration-300"
                    onClick={handleStartup}
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