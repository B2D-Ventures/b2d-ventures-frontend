"use client";
import React from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";

interface Deal {
  attributes: {
    deal: string;
    id: string;
    investment_amount: number;
    investment_date: string;
    investor: string;
  };
}

export default function App({ deals }: { deals: Deal[] }) {

  function numberToStringFormat(amount: number) {
    return amount
      ? amount > 999999
        ? `$${(amount / 1000000).toLocaleString()}M`
        : amount > 999
        ? `$${(amount / 1000).toLocaleString()}K`
        : `$${amount}`
      : 0;
  }


  function dealNameFormatter(deal: string) {
    return `${deal.split("-")[0]}`;
  }

  function formatDate(isoDate: string) {
    const date = new Date(isoDate);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString();
  }

  return (
    <Accordion>
      {deals.map((deal) => (
        <AccordionItem
          data-testid="startup-accordian"
          key={deal.attributes.id}
          aria-label="Accordion 1"
          title={`${dealNameFormatter(deal.attributes.deal)} - ${deal.attributes.investor}`}
        >
          <div className="grid grid-cols-3 pl-12">
            <div className="flex flex-col">
              <div className="text-[20px] font-bold">
                {dealNameFormatter(deal.attributes.deal)}
              </div>
              <div className="text-secondary">Deal</div>
            </div>
            <div className="flex flex-col">
              <div className="text-[20px] font-bold">
                {numberToStringFormat(deal.attributes.investment_amount)}
              </div>
              <div className="text-secondary">Investment amount</div>
            </div>
            <div className="flex flex-col">
              <div className="text-[20px] font-bold">{formatDate(deal.attributes.investment_date)}</div>
              <div className="text-secondary">Investment date</div>
            </div>
          </div>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
