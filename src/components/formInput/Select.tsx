import React from "react";
import { Select, SelectItem } from "@nextui-org/react";


interface SelectFormProps {
  value?: string; 
  onChange?: (e: any) => void;
}

export default function SelectForm({ value, onChange }: SelectFormProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-1">
      <div className="w-full text-[16px] text-secondary">Business type</div>
      <Select
        label="select"
        variant="bordered"
        size="sm"
        classNames={{
          trigger: "border-none bg-[#F4F4F5] shadow-none px-4 ",
          label: "text-[16px]",
          value: "text-[16px]",
        }}
        listboxProps={{
          hideSelectedIcon: true,
          className: "text-secondary shadow-none",
        }}
        value={value}
        onChange={onChange}
      >
      <SelectItem key={"Renewable Energy"} data-testid="select-value">Renewable Energy</SelectItem>
      <SelectItem key={"Biotechnology"}>Biotechnology</SelectItem>
      <SelectItem key={"Artificial Intelligence"}>Artificial Intelligence</SelectItem>
      <SelectItem key={"Sustainable Fashion"}>Sustainable Fashion</SelectItem>
      <SelectItem key={"Space Exploration"}>Space Exploration</SelectItem>
      <SelectItem key={"Healthcare"}>Healthcare</SelectItem>
      <SelectItem key={"Education Technology"}>Education Technology</SelectItem>
      <SelectItem key={"Quantum Computing"}>Quantum Computing</SelectItem>
      <SelectItem key={"Water Technology"}>Water Technology</SelectItem>
      <SelectItem key={"Neuroscience AI"}>Neuroscience AI</SelectItem>
      <SelectItem key={"Agriculture Technology"}>Agriculture Technology</SelectItem>
      <SelectItem key={"Environmental Technology"}>Environmental Technology</SelectItem>
      </Select>
    </div>
  );
}
