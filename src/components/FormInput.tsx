import React from "react";
import { Input } from "@nextui-org/react";

interface FormInputProps {
  label: string;
  has$: boolean;
  placeholder: string;
  type: string;
}

export default function FormInput({
  label,
  has$,
  placeholder,
  type,
}: FormInputProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-1">
      <div className="w-full text-[16px] text-secondary">{label}</div>
      <Input
        type={type}
        placeholder={placeholder}
        size="md"
        labelPlacement="outside"
        endContent={
          has$ && (
            <div className="pointer-events-none flex items-center">
              <span className="text-default-400 text-small">$</span>
            </div>
          )
        }
        classNames={{
          inputWrapper:
            "shadow-none px-4 h-[62px] bg-textAreaBg rounded-[8px] group-data-[filled=true]:bg-textAreaBg",
          input: "focus:outline-none text-[16px] text-secondary ",
          label: "text-secondary text-[16px]",
          innerWrapper: "h-[62px]",
        }}
      />
    </div>
  );
}
