"use client";

import React from "react";
import FormInput from "@/components/FormInput";

export default function FormInputPage() {
  return (
    <div className="flex w-full h-screen items-center justify-center">
      <div className="w-[547px]">
        <FormInput
          label="Nong Game pen kon dee"
          has$={false}
          placeholder="jing mai?"
          type="text"
        />
      </div>
    </div>
  );
}
