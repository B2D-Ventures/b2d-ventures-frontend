import React from "react";
import { DatePicker, DateValue } from "@nextui-org/react";

interface DatePickerProps {
  value?: DateValue;
  onChange?: (e: any) => void;
  testid?: string;
}
export default function App({ onChange, value, testid }: DatePickerProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <div className="flex w-full flex-wrap items-end md:flex-nowrap mb-6 md:mb-0 gap-4">
          <DatePicker
            data-testid={testid}
            classNames={{
              base: "w-full text-[16px] text-secondary",
              label: "!text-secondary text-[16px]",
              input: "text-[16px] focus:outline-none focus:text-red",
            }}
            description={"outside"}
            labelPlacement={"outside"}
            value={value}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
}
