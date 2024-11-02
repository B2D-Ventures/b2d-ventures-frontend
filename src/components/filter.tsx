import React from "react";
import { Select, SelectItem } from "@nextui-org/react";

interface SelectFormProps {
  value?: string; 
  onChange?: (e: any) => void;
}

export default function App({ value, onChange }: SelectFormProps) {
  return (
    <Select
      data-testid="deal-filter"
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
      <SelectItem key={"Funded"}>Funded</SelectItem>
      <SelectItem key={"100+ invesetors"}>100+ investors</SelectItem>
      <SelectItem key={"$100k+ raised"}>$100k+ raised</SelectItem>
      <SelectItem key={"Tech Company"} data-testid="deal-filter-listbox">Tech Company</SelectItem>
      <SelectItem key={"Health Company"}>Health Company</SelectItem>
      <SelectItem key={"Artificial Intelligence (AI)"}>
        Artificial Intelligence (AI)
      </SelectItem>
      <SelectItem key={"Blockchain"}>Blockchain</SelectItem>
      <SelectItem key={"Asia-Pacific"}>Asia-Pacific</SelectItem>
      <SelectItem key={"Growth phase"}>Growth phase</SelectItem>
    </Select>
  );
}
