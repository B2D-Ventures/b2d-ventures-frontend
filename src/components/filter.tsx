import React from "react";
import { Select, SelectItem } from "@nextui-org/react";

export default function App() {
  return (
    <Select
      label="Filter"
      className="w-[218px]"
      variant="bordered"
      size="sm"
      
      classNames={{
        trigger: "border-[1px] shadow-none",
      }}
      listboxProps={{
        hideSelectedIcon: true,
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
  );
}
