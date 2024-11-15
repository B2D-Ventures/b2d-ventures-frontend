interface InvestorCardProps {
  name: string;
  totalInvestment: number;
}

export default function InvestorCard({ name, totalInvestment }: InvestorCardProps) {
  return (
    <div className="w-full sm:w-[380px] lg:w-[440px] bg-white border-[1px] border-border rounded-[8px] 
                    flex flex-col px-4 sm:px-8 lg:px-10 py-4 sm:py-6 items-center justify-center">
      <div className="w-full text-2xl sm:text-3xl lg:text-[24px] text-black break-words">
        {name}
      </div>
      <div className="w-full h-[1px] bg-border my-2 sm:my-4"></div>
      <div className="w-full text-xl sm:text-2xl lg:text-[24px] text-secondary font-light">
        Total investment
      </div>
      <div className="w-full text-2xl sm:text-3xl lg:text-[30px] text-black break-words">
        ${totalInvestment}
      </div>
    </div>
  );
}