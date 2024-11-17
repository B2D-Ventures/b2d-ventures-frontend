import { useState } from "react";
import Image from "next/image";
import { image, Progress } from "@nextui-org/react";
import InvestModal from "./modal/InvestModal";
import TermModal from "./modal/TermModal";

interface DetailCardProps {
  target_amount: number;
  pricePerFractionalUnit: number;
  minimumInvestment: number;
  amount_raised: number;
  fundingGoal: number;
  dealEnd: string;
  image_bg: string;
  dealId: string;
}

const API_BASE_URL = `${process.env.NEXT_PUBLIC_URI}`;
const DEFAULT_BG_IMAGE = "/images/lexi.png"; // Replace with your default background image path
const DEFAULT_ICON_IMAGE = "/images/icon.jpg"; // Replace with your default icon image path

const getImageSrc = (imagePath?: string, isIcon: boolean = false) => {
  if (!imagePath) return isIcon ? DEFAULT_ICON_IMAGE : DEFAULT_BG_IMAGE;
  const fullPath = imagePath.startsWith("http")
    ? imagePath
    : `${API_BASE_URL}${imagePath}`;
  return fullPath;
};

function numberToStringFormat(amount: number) {
  return amount? amount > 999999 ? `$${(amount / 1000000).toLocaleString()}M` : amount > 999 ? `$${(amount / 1000).toLocaleString()}K` : amount : 0;
}

function formatDate(isoDate: string) {
  const date = new Date(isoDate);
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return date.toLocaleDateString();
}

// Example usage:
const formattedDate = formatDate("2024-08-06T17:00:00Z");
console.log(formattedDate); // Output: Aug 6, 2024

export default function DetailCard({
  target_amount,
  pricePerFractionalUnit,
  minimumInvestment,
  amount_raised,
  fundingGoal,
  dealEnd,
  image_bg,
  dealId,
}: DetailCardProps) {


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
          <div className="text-black font-bold">
            {numberToStringFormat(target_amount)}
          </div>
        </div>
        <div className="w-full h-[1px] bg-border my-2"></div>
        <div className="flex justify-between items-center text-[16px]">
          <div className="text-secondary ">Price per Fractional Unit</div>
          <div className="text-black font-bold">{numberToStringFormat(pricePerFractionalUnit)}</div>
        </div>
        <div className="w-full h-[1px] bg-border my-2"></div>
        <div className="flex justify-between items-center text-[16px]">
          <div className="text-secondary ">Minimum investment</div>
          <div className="text-black font-bold">{numberToStringFormat(minimumInvestment)}</div>
        </div>
        <div className="w-full h-[1px] bg-border my-2"></div>
        <div className="flex justify-between items-end">
          <div className="text-secondary text-[24px]">raised</div>
          <div className="text-black font-bold text-[36px]">{numberToStringFormat(amount_raised)}</div>
        </div>
        <div className="w-full h-[175px] rounded-[8px] overflow-hidden my-1">
          <Image src={getImageSrc(image_bg)} width={378} height={10} alt="image" />
        </div>
        <div
          data-testid="fund-button"
          className="w-full h-[44px] bg-purple rounded-[8px] my-2 flex items-center justify-center text-white text-[24px] font-bold hover:cursor-pointer"
          onClick={handleFundClick}
        >
          Fund
        </div>
        <div className="flex justify-between items-end">
          <div className="text-secondary text-[24px]">Funding goal</div>
          <div className="text-black font-bold text-[36px]">
            {numberToStringFormat(fundingGoal)}
          </div>
        </div>
        <Progress
          aria-label="Downloading..."
          size="md"
          value={amount_raised / fundingGoal * 100}
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
          <div className="text-black font-md text-[28px]">{formatDate(dealEnd)}</div>
        </div>
      </div>
      <InvestModal
        isOpen={isInvestModalOpen}
        onOpen={() => setInvestModalOpen(true)}
        onOpenChange={() => setInvestModalOpen(!isInvestModalOpen)}
        minInvestAmount={minimumInvestment}
        pricePerUnit={pricePerFractionalUnit}
        dealId={dealId}
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
