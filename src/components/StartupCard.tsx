interface StartupCardProps {
    name: string;
    totalInvestment: string;
}

export default function StartupCard({ name, totalInvestment }: StartupCardProps) {
  return (
    <div className="w-[440px] h-[262px] bg-white border-[1px] border-border rounded-[8px] flex flex-col px-10 py-6 items-center justify-center">
      <div className="w-full text-[36px] text-black">{name}</div>
      <div className="w-full h-[1px] bg-border my-4"></div>
      <div className="w-full text-[32px] text-secondary font-light">Total investment</div>
      <div className="w-full text-[36px] text-black">${totalInvestment}</div>
    </div>
  );
}
