"use client";
import React from "react";
import Image from "next/image";
import { Accordion, AccordionItem } from "@nextui-org/react";

export default function App() {
  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

  const content = (
    <div className="grid grid-cols-3">
      <div className="flex flex-col">
        <div className="text-[20px] font-bold">$10,000</div>
        <div className="text-secondary">Your invested price</div>
      </div>
      <div className="flex flex-col">
        <div className="text-[20px] font-bold">$12,390</div>
        <div className="text-secondary">raised</div>
      </div>
      <div className="flex flex-col">
        <div className="text-[20px] font-bold">$1.2M</div>
        <div className="text-secondary">Funding goal</div>
      </div>
    </div>
  );

  return (
    <Accordion>
      <AccordionItem
        key="1"
        aria-label="Accordion 1"
        title="LEXI"
        startContent={
          <Image
            src="/images/icon.jpg"
            width={48}
            height={48}
            alt="logo"
            className="w-[40px] h-[40px] rounded-[8px] overflow-hidden shadow-sm"
          />
        }
      >
        {content}
      </AccordionItem>
      <AccordionItem
        key="2"
        aria-label="Accordion 2"
        title="Angrybird"
        startContent={
          <Image
            src="/images/icon.jpg"
            width={48}
            height={48}
            alt="logo"
            className="w-[40px] h-[40px] rounded-[8px] overflow-hidden shadow-sm"
          />
        }
      >
        {defaultContent}
      </AccordionItem>
      <AccordionItem
        key="3"
        aria-label="Accordion 3"
        title="Jojo"
        startContent={
          <Image
            src="/images/icon.jpg"
            width={48}
            height={48}
            alt="logo"
            className="w-[40px] h-[40px] rounded-[8px] overflow-hidden shadow-sm"
          />
        }
      >
        {defaultContent}
      </AccordionItem>
    </Accordion>
  );
}
