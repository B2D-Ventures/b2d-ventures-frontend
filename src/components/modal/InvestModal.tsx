import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Slider,
} from "@nextui-org/react";

interface InvestModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: () => void;
}

export default function InvestModal({ isOpen, onOpen, onOpenChange }: InvestModalProps) {

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        classNames={{
          wrapper: "flex justify-center items-center",
          base: "rounded-[8px] w-[532px] h-[426px] px-4 py-4",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-[32px]">
                Investment deal
              </ModalHeader>
              <ModalBody>
                <Slider
                  label="Select a value"
                  color="foreground"
                  step={10}
                  marks={[
                    { value: 20, label: "20%" },
                    { value: 50, label: "50%" },
                    { value: 80, label: "80%" },
                  ]}
                  defaultValue={20}
                  classNames={{
                    labelWrapper: "text-center mb-2",
                    label: "text-[20px]",
                    value: "text-[20px]",
                    trackWrapper: "h-2",
                    track: "bg-border h-1",
                    thumb:
                      "bg-white h-4 w-4 border-2 border-purple hover:cursor-pointer",
                    filler: "bg-purple",
                    mark: "mt-4 text-sm text-center ml-[-8px]",
                  }}
                />
              </ModalBody>
              <ModalFooter>
                <div className="flex flex-row w-full h-full gap-4 items-center">
                  <div className="w-full flex items-center justify-center border-[2px] border-red rounded-[8px] text-red text-[20px] hover:cursor-pointer">
                    Cancel
                  </div>
                  <div className="w-full flex items-center justify-center bg-purple border-[2px] border-purple rounded-[8px] text-white text-[20px] hover:cursor-pointer">
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
