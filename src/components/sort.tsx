import React from "react";
import { Select, SelectItem } from "@nextui-org/react";

interface SortFormProps {
  value?: string;
  onChange?: (e: any) => void;
}

export default function SortFilter({ value, onChange }: SortFormProps) {
  return (
    <Select
      label="Sort By"
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
      <SelectItem key={"newest"}>Newest</SelectItem>
      <SelectItem key={"trending"}>Trending</SelectItem>
      <SelectItem key={"closing-soon"}>Closing Soon</SelectItem>
    </Select>
  );
}