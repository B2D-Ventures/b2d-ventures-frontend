"use client";
import DealTable from "@/components/DealTableInvestor";
import { useRouter } from "next/navigation";

const Home: React.FC = () => {
  const router = useRouter();

  return (
    <div className="w-full min-h-screen">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-4 sm:py-6 lg:py-10">
        {/* Header Section */}
        <div className="flex flex-col gap-2 sm:gap-4 mb-4 sm:mb-6">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold 
                       text-gray-900 break-words">
            Admin Approve Investor
          </h1>
          <p className="text-base sm:text-lg text-gray-600">
            Approve investor to make them able to invest.
          </p>
        </div>

        {/* Table Section */}
        <div className="mt-4 sm:mt-6">
          <DealTable />
        </div>
      </div>
    </div>
  );
};

export default Home;