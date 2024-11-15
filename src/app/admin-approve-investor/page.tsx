"use client";
import DealTable from "@/components/DealTableInvestor";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

const Home: React.FC = () => {
  const router = useRouter();
  const handleClick = () => {
    router.push("/admin-management");
  };

  return (
    <div className="container mx-auto p-10">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold">Admin Approve Investor</h1>
          <p className="text-lg text-black-600 mt-2">Approve investor to make them able to invest.</p>
        </div>
      </div>
      <div className="mt-4">
        <DealTable />
      </div>
    </div>
  );
};

export default Home;
