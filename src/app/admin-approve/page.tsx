"use client";
import DealTable from "@/components/DealTable";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

const Home: React.FC = () => {
  const router = useRouter();
  const handleClick = () => {
    router.push("/admin-management");
  };

  return (
    <div className="w-full min-h-screen">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-4 sm:py-6 lg:py-10">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center 
                      gap-4 sm:gap-6 mb-4 sm:mb-6">
          {/* Title Section */}
          <div className="w-full sm:w-auto">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold 
                         break-words">
              Admin Approve Dashboard
            </h1>
            <p className="text-base sm:text-lg text-black-600 mt-1 sm:mt-2">
              Approve startup deals.
            </p>
          </div>

          {/* Buttons Section */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center 
                        gap-2 sm:gap-4 w-full sm:w-auto">
                        <Button
              onClick={() => router.push("/admin-approve-investor")}
              className="w-full sm:w-auto px-4 py-2 text-sm sm:text-base"
              style={{ 
                backgroundColor: "#9710FF", 
                color: "#fff",
                minWidth: "120px"
              }}
            >
              Approve role
            </Button>
            <Button
              onClick={() => router.push("/admin-dashboard")}
              className="w-full sm:w-auto px-4 py-2 text-sm sm:text-base"
              style={{ 
                backgroundColor: "#9710FF", 
                color: "#fff",
                minWidth: "120px"
              }}
            >
              Dashboard
            </Button>
            <Button
              onClick={handleClick}
              className="w-full sm:w-auto px-4 py-2 text-sm sm:text-base"
              style={{ 
                backgroundColor: "#9710FF", 
                color: "#fff",
                minWidth: "120px"
              }}
            >
              Manage Startup
            </Button>
          </div>
        </div>

        {/* Table Section */}
        <div className="mt-4 sm:mt-6 overflow-x-auto">
          <DealTable />
        </div>
      </div>
    </div>
  );
};

export default Home;