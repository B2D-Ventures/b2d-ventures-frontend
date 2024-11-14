"use client";

import React from "react";
import DetailCard from "@/components/DetailCard";

export default function DealCardPage({}) {
  return (
    <div className="flex w-full justify-center items-center p-4">
      <DetailCard 
        target_amount={1000000}
        pricePerFractionalUnit={100}
        minimumInvestment={100}
        amount_raised={100000}
        fundingGoal={1000000}
        dealEnd={new Date().toISOString()}
        image_bg="/images/lexi.png"
        dealId="1"
      />
    </div>  
  );
}
