"use client";
import React from "react";
import Image from "next/image";
import { Accordion, AccordionItem } from "@nextui-org/react";

export default function App() {
  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

  const content = (
    <div className="grid grid-cols-3 pl-12">
      <div className="flex flex-col">
        <div className="text-[20px] font-bold">$10,000</div>
        <div className="text-secondary">Invested price</div>
      </div>
      <div className="flex flex-col">
        <div className="text-[20px] font-bold">LEXI</div>
        <div className="text-secondary">Deal</div>
      </div>
      <div className="flex flex-col">
        <div className="text-[20px] font-bold">$12,390</div>
        <div className="text-secondary">Toatal raised</div>
      </div>
    </div>
  );

  return (
    <Accordion>
      <AccordionItem
        key="1"
        aria-label="Accordion 1"
        title="Elon Must"
        startContent={
          <Image
            src="/images/Ellipse.png"
            width={56}
            height={56}
            alt="logo"
            className="shadow-sm"
          />
        }
      >
        {content}
      </AccordionItem>
      <AccordionItem
        key="2"
        aria-label="Accordion 2"
        title="JJ Kung"
        startContent={
          <Image
            src="/images/Ellipse.png"
            width={56}
            height={56}
            alt="logo"
            className="shadow-sm"
          />
        }
      >
        {content}
      </AccordionItem>
      <AccordionItem
        key="3"
        aria-label="Accordion 3"
        title="Jetjumnong"
        startContent={
          <Image
            src="/images/Ellipse.png"
            width={56}
            height={56}
            alt="logo"
            className="shadow-sm"
          />
        }
      >
        {content}
      </AccordionItem>
      <AccordionItem
        key="4"
        aria-label="Accordion 4"
        title="Tantikon P."
        startContent={
          <Image
            src="/images/Ellipse.png"
            width={56}
            height={56}
            alt="logo"
            className="shadow-sm"
          />
        }
      >
        {content}
      </AccordionItem>
      <AccordionItem
        key="5"
        aria-label="Accordion 5"
        title="Yanat Jereja"
        startContent={
          <Image
            src="/images/Ellipse.png"
            width={56}
            height={56}
            alt="logo"
            className="shadow-sm"
          />
        }
      >
        {content}
      </AccordionItem>
      <AccordionItem
        key="6"
        aria-label="Accordion 6"
        title="lolo"
        startContent={
          <Image
            src="/images/Ellipse.png"
            width={56}
            height={56}
            alt="logo"
            className="shadow-sm"
          />
        }
      >
        {content}
      </AccordionItem>
    </Accordion>
  );
}
