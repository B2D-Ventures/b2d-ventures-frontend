import React from "react";
import { Select, SelectItem } from "@nextui-org/react";

interface SelectFormProps {
  value?: string; 
  onChange?: (e: any) => void;
}

export default function App({ value, onChange }: SelectFormProps) {
  return (
    <Select
      data-testid="category-filter"
      label="Filter"
      className="w-[218px]"
      variant="bordered"
      size="sm"
      classNames={{
        trigger: "border-[1px] shadow-none px-4 ",
        label: "text-secondary text-[16px]",
      }}
      listboxProps={{
        hideSelectedIcon: true,
        className: "text-secondary shadow-none",
      }}
      onChange={onChange}
      value={value}
    >
      <SelectItem key={"Renewable Energy"} data-testid="category-filter-item">Renewable Energy</SelectItem>
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
  );
}
