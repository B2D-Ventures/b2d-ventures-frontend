interface StartupCardProps {
  name: string | null;
  totalInvestment: string;
}

export default function StartupCard({ name, totalInvestment }: StartupCardProps) {
return (
  <div className="w-full sm:w-[380px] lg:w-[440px] 
                  min-h-[200px] sm:min-h-[230px] lg:h-[262px] 
                  bg-white border-[1px] border-border rounded-[8px] 
                  flex flex-col 
                  px-4 sm:px-8 lg:px-10 
                  py-4 sm:py-5 lg:py-6 
                  items-center justify-center">
    <div className="w-full text-2xl sm:text-3xl lg:text-[36px] text-black 
                  break-words line-clamp-2">
      {name}
    </div>
    
    <div className="w-full h-[1px] bg-border my-2 sm:my-3 lg:my-4"></div>
    
    <div className="w-full text-xl mb-4 sm:text-2xl lg:text-[32px] 
                  text-secondary font-light">
      Total raised
    </div>
    
    <div className="w-full text-2xl sm:text-3xl lg:text-[36px] 
                  text-black break-words">
      ${totalInvestment.toLocaleString()}
    </div>
  </div>
);
}