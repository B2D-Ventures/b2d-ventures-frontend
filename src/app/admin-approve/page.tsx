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
    <div className="container mx-auto p-10">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold">Admin Approve Dashboard</h1>
          <p className="text-lg text-black-600 mt-2">Approve startup deals.</p>
        </div>
        <div className="flex items-center space-x-4">
          <Button
            onClick={handleClick}
            style={{ backgroundColor: "#9710FF", color: "#fff" }}
          >
            Manage Startup
          </Button>
        </div>
      </div>
      <div className="mt-4">
        <DealTable />
      </div>
    </div>
  );
};

export default Home;
