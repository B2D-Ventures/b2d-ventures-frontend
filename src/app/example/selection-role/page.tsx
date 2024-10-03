"use client";
import React from "react";
import axios from "axios";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

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
        `http://127.0.0.1:8000/api/auths/${userToken}`,
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

      // After successful role change, redirect to startup page with role
      router.push(`/startup?user=${encodeURIComponent(userToken)}&role=${role}`);
    } catch (error) {
      console.error("Error changing role:", error);
      // Handle error (e.g., show error message to user)
    }
  };

  const handleInvestor = () => {
    changeRole('investor');
  };

  const handleStartup = () => {
    changeRole('startup');
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
                  <button
                    className="bg-[#FFFFFF] text-[#000000] py-2 px-6 rounded-xl border-2 border-[#D9D9D9] shadow-md hover:shadow-lg w-1/5 font-medium"
                    onClick={handleInvestor}
                  >
                    INVESTOR
                  </button>
                </div>
                <div className="my-12">
                  <button
                    className="bg-[#FFFFFF] text-[#000000] py-2 px-6 rounded-xl border-2 border-[#D9D9D9] shadow-md hover:shadow-lg w-1/5 font-medium"
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
