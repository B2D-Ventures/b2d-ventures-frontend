"use client";
import React from "react";
import Image from "next/image";
import { Accordion, AccordionItem } from "@nextui-org/react";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_URI}`;
const DEFAULT_BG_IMAGE = "/images/lexi.png"; // Replace with your default background image path
const DEFAULT_ICON_IMAGE = "/images/icon.jpg"; // Replace with your default icon image path
interface Deal {
  attributes: {
    id: string;
    name: string;
    description: string;
    target_amount: number;
    amount_raised: string;
    investor_count: number;
    image_logo_url: string;
    image_content_url: string;
    type: string;
  };
}

export default function App({ deals }: { deals: Deal[] }) {
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

  return (
    <Accordion>
      {deals.map((deal) => (
        <AccordionItem
          key={deal.attributes.id}
          aria-label="Accordion 1"
          title={
            <span className="text-base sm:text-lg lg:text-xl">
              {deal.attributes.name}
            </span>
          }
          startContent={
            <Image
              src={getImageSrc(deal.attributes.image_logo_url)}
              width={48}
              height={48}
              alt="logo"
              className="w-[32px] h-[32px] sm:w-[36px] sm:h-[36px] lg:w-[40px] lg:h-[40px] 
                         rounded-[8px] overflow-hidden shadow-sm"
            />
          }
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pl-4 sm:pl-8 lg:pl-12">
            <div className="flex flex-col">
              <div className="text-base sm:text-lg lg:text-[20px] font-bold">
                {deal.attributes.investor_count}
              </div>
              <div className="text-sm sm:text-base text-secondary">
                Investment number
              </div>
            </div>
            <div className="flex flex-col">
              <div className="text-base sm:text-lg lg:text-[20px] font-bold">
                ${deal.attributes.amount_raised}
              </div>
              <div className="text-sm sm:text-base text-secondary">
                raised
              </div>
            </div>
            <div className="flex flex-col">
              <div className="text-base sm:text-lg lg:text-[20px] font-bold">
                {numberToStringFormat(deal.attributes.target_amount)}
              </div>
              <div className="text-sm sm:text-base text-secondary">
                Funding goal
              </div>
            </div>
          </div>
        </AccordionItem>
      ))}
    </Accordion>
  );
}