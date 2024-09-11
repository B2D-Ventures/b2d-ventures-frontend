import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
} from "@nextui-org/react";

interface TermModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: () => void;
  onNext: () => void;
}

export default function TermModal({
  isOpen,
  onOpen,
  onOpenChange,
  onNext,
}: TermModalProps) {
  const [isChecked, setIsChecked] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleCheckboxChange = (checked: boolean) => {
    setIsChecked(checked);
    if (checked) {
      setShowError(false);
    }
  };

  const handleNextClick = () => {
    if (isChecked) {
      onNext();
    } else {
      setShowError(true);
    }
  };

  return (
    <div className="z-1">
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        classNames={{
          wrapper: "flex justify-center items-center",
          base: "rounded-[8px] w-[532px] h-[560px] px-4 py-4",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-[32px]">
                Terms and Conditions
              </ModalHeader>
              <ModalBody>
                <div className="flex text-[16px]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor
                  quam.Magna exercitation reprehenderit magna aute tempor
                  cupidatat consequat elit dolor adipisicing. Mollit dolor
                  eiusmod sunt ex incididunt cillum quis. Velit duis sit officia
                  eiusmod Lorem aliqua enim laboris do dolor eiusmod. Et mollit
                  incididunt nisi consectetur esse laborum eiusmod pariatur
                  proident Lorem eiusmod et.
                </div>
              </ModalBody>
              <ModalFooter className="flex flex-col">
                <Checkbox
                  isSelected={isChecked}
                  onValueChange={handleCheckboxChange}
                  classNames={{
                    wrapper:
                      "flex justify-center items-center bg-white border-[1px] rounded-[8px] text-white text-[20px]",
                    label: "ml-2 text-secondary",
                    icon: "text-purple",
                  }}
                >
                  I agree with the Terms and Conditions
                </Checkbox>
                {showError && (
                  <div className="text-red text-[14px] mt-2">
                    Please agree to the Terms and Conditions before proceeding.
                  </div>
                )}
                <div className="flex flex-row w-full h-full gap-4 items-center mt-4">
                  <div
                    className="w-full flex items-center justify-center border-[2px] border-red rounded-[8px] text-red text-[20px]"
                    onClick={onClose}
                  >
                    Cancel
                  </div>
                  <div
                    className={`w-full flex items-center justify-center ${
                      isChecked ? "bg-purple" : "bg-gray-400"
                    } border-[2px] border-purple rounded-[8px] text-white text-[20px] hover:cursor-pointer`}
                    onClick={handleNextClick}
                  >
                    Next
                  </div>
                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
