"use client";

import React from "react";
import InvestModal from "@/components/modal/InvestModal";
import TermModal from "@/components/modal/TermModal";

export default function ModalPage({}) {
  return (
    <div className="flex w-full justify-center items-center p-4">
      <InvestModal />
      <TermModal />
    </div>
  );
}
