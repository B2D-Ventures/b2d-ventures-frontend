import React from "react";
import { Select, SelectItem } from "@nextui-org/react";


interface SelectFormProps {
  value?: string; 
  testId?: string;
  onChange?: (e: any) => void;
}

export default function SelectForm({ value, onChange, testId }: SelectFormProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-1">
      <div className="w-full text-[16px] text-secondary">Business type</div>
      <Select
        data-testid={testId}
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
        <SelectItem key={"Funded"}>Funded</SelectItem>
        <SelectItem key={"100+ invesetors"}>100+ investors</SelectItem>
        <SelectItem key={"$100k+ raised"}>$100k+ raised</SelectItem>
        <SelectItem data-testid="select-value" key={"Tech Company"}>Tech Company</SelectItem>
        <SelectItem key={"Health Company"}>Health Company</SelectItem>
        <SelectItem key={"Artificial Intelligence (AI)"}>Artificial Intelligence (AI)</SelectItem>
        <SelectItem key={"Blockchain"}>Blockchain</SelectItem>
        <SelectItem key={"Asia-Pacific"}>Asia-Pacific</SelectItem>
        <SelectItem key={"Growth phase"}>Growth phase</SelectItem>
      </Select>
    </div>
  );
}
