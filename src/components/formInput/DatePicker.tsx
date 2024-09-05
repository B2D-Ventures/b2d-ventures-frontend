import React from "react";
import { DateInput } from "@nextui-org/react";
import { CalendarDate } from "@internationalized/date";


interface DateInputProps {
  value?: CalendarDate;
  onChange?: (e: any) => void;
}

export default function App({ onChange, value }: DateInputProps) {

  return (
    <div className="flex flex-col items-center justify-center gap-1">
      <div className="w-full text-[16px] text-secondary">Start date</div>
      <DateInput
        placeholderValue={new CalendarDate(1995, 11, 6)}
        classNames={{
          base: "h-[48px] w-full",
          inputWrapper: "h-12 bg-textAreaBg rounded-[8px] shadow-none",
          input: "text-[16px] focus:outline-none focus:text-red",
        }}
        onChange={onChange}
        value={value}
      />
    </div>
  );
}
