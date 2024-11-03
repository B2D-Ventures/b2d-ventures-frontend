interface adminCardProps {
    totalStartup: string;
}

export default function adminCard({totalStartup}: adminCardProps) {
  return (
    <div className="w-[440px] h-[262px] bg-white border-[1px] border-border rounded-[8px] flex flex-col px-10 py-6 items-center justify-center">
      <div className="w-full text-[36px] text-black">General</div>
      <div className="w-full h-[1px] bg-border my-4"></div>
      <div className="w-full text-[32px] text-secondary font-light">Total Investment</div>
      <div className="w-full text-[36px] text-black">{totalStartup}</div>
    </div>
  );
}
