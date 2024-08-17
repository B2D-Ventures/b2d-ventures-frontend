import React from "react";
import Image from "next/image";

export default function SearchBar() {
  return (
    <div className="flex items-center w-[315px] h-[48px] px-4 gap-4 text-[16px] text-secondary border-[1px] border-border rounded-[5px]">
        <Image src="/images/Search.png" width={20} height={20} alt="search" className="w-5 h-5 "/>
        <input
          type="text"
          placeholder="Search"
          className="w-full h-full bg-transparent outline-none"
        />
    </div>
  );
}
