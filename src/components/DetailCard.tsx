import { useState } from "react";
import Image from "next/image";
import { Progress } from "@nextui-org/react";
import InvestModal from "./modal/InvestModal";
import TermModal from "./modal/TermModal";
import { useDisclosure } from "@nextui-org/react";

export default function DetailCard() {
  const handleOnClick = () => {
    console.log("Fund button clicked");
  };

  const handleFundClick = () => {
    setTermModalOpen(true);
  };

  const handleInvestModalNext = () => {
    setTermModalOpen(false);
    setInvestModalOpen(true);
  };

  const [isInvestModalOpen, setInvestModalOpen] = useState(false);
  const [isTermModalOpen, setTermModalOpen] = useState(false);

  return (
    <>
      <div className="w-[378px] h-[647px] bg-wwhite border-[2px] border-border rounded-[8px] px-6 py-10">
        <div className="flex justify-between items-center text-[16px]">
          <div className="text-secondary ">Allocation</div>
          <div className="text-black font-bold">$1.2M</div>
        </div>
        <div className="w-full h-[1px] bg-border my-2"></div>
        <div className="flex justify-between items-center text-[16px]">
          <div className="text-secondary ">Price per Fractional Unit</div>
          <div className="text-black font-bold">$10,000</div>
        </div>
        <div className="w-full h-[1px] bg-border my-2"></div>
        <div className="flex justify-between items-center text-[16px]">
          <div className="text-secondary ">Minimum investment</div>
          <div className="text-black font-bold">$10,000</div>
        </div>
        <div className="w-full h-[1px] bg-border my-2"></div>
        <div className="flex justify-between items-end">
          <div className="text-secondary text-[24px]">raised</div>
          <div className="text-black font-bold text-[36px]">$712,390</div>
        </div>
        <div className="w-full h-[175px] rounded-[8px] overflow-hidden my-1">
          <Image src="/images/detail.png" width={378} height={10} alt="image" />
        </div>
        <div
          className="w-full h-[44px] bg-purple rounded-[8px] my-2 flex items-center justify-center text-white text-[24px] font-bold hover:cursor-pointer"
          onClick={handleFundClick}
        >
          Fund
        </div>
        <div className="flex justify-between items-end">
          <div className="text-secondary text-[24px]">Funding goal</div>
          <div className="text-black font-bold text-[36px]">$1.2M</div>
        </div>
        <Progress
          aria-label="Downloading..."
          size="md"
          value={60}
          showValueLabel={true}
          classNames={{
            base: "w-full h-[36px]",
            indicator: "bg-purple",
            track: "bg-border",
            value: "text-[16px] text-secondary",
          }}
        />
        <div className="flex justify-between items-end mb-auto">
          <div className="text-secondary text-[24px]">Deal end</div>
          <div className="text-black font-md text-[28px]">Aug 6, 2024</div>
        </div>
      </div>
      <InvestModal
        isOpen={isInvestModalOpen}
        onOpen={() => setInvestModalOpen(true)}
        onOpenChange={() => setInvestModalOpen(!isInvestModalOpen)}
        
      />
      <TermModal
        isOpen={isTermModalOpen}
        onOpen={() => setTermModalOpen(true)}
        onOpenChange={() => setTermModalOpen(!isTermModalOpen)}
        onNext={handleInvestModalNext}
      />
    </>
  );
}
