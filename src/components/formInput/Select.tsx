import React from "react";
import { Select, SelectItem } from "@nextui-org/react";

export default function SelectForm() {
  return (
    <div className="flex flex-col items-center justify-center gap-1">
      <div className="w-full text-[16px] text-secondary">Business type</div>
      <Select
        label="select"
        variant="bordered"
        size="sm"
        classNames={{
          trigger: "border-none bg-textAreaBg shadow-none px-4 ",
          label: "text-secondary text-[16px]",
          value: "text-secondary text-[16px]",
        }}
        listboxProps={{
          hideSelectedIcon: true,
          className: "text-secondary shadow-none",
        }}
      >
        <SelectItem key={1}>Funded</SelectItem>
        <SelectItem key={2}>100+ investors</SelectItem>
        <SelectItem key={3}>$100k+ raised</SelectItem>
        <SelectItem key={4}>Tech Company</SelectItem>
        <SelectItem key={5}>Health Company</SelectItem>
        <SelectItem key={6}>Artificial Intelligence (AI)</SelectItem>
        <SelectItem key={7}>Blockchain</SelectItem>
        <SelectItem key={8}>Asia-Pacific</SelectItem>
        <SelectItem key={9}>Growth phase</SelectItem>
      </Select>
    </div>
  );
}
