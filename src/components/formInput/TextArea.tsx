import React from "react";
import { Textarea } from "@nextui-org/react";

interface TextAreaProps {
    placeholder: string;
    value?: string;
    onChange?: (e: any) => void;
}

export default function TextArea({ placeholder, value, onChange }: TextAreaProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-1">
      <div className="w-full text-[16px] text-secondary">Content</div>
      <Textarea
        data-testid="content-input"
        placeholder={placeholder}
        style={{ height: "120px" }}
        classNames={{
            base: "w-full h-[139px]",
            mainWrapper: "w-full h-full",
            inputWrapper: "shadow-none px-4 !h-[139px] bg-[#F4F4F5] rounded-[8px]",
            input: "focus:outline-none text-[16px] !max-h-[120px] min-h-[120px] group-data-[has-value=true]:text-secondary text-secondary",
            label: "text-secondary text-[16px]",
        }}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
