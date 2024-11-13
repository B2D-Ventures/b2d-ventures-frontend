import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Slider,
} from "@nextui-org/react";

interface InvestModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: () => void;
  minInvestAmount: number;
  pricePerUnit: number;
  dealId: string;
}

export default function InvestModal({
  isOpen,
  onOpenChange,
  minInvestAmount,
  pricePerUnit,
  dealId,
}: InvestModalProps) {
  const [sliderValue, setSliderValue] = useState(1);
  const [investmentAmount, setInvestmentAmount] = useState(pricePerUnit);

  const maxMultiplier = 10;

  useEffect(() => {
    const calculatedAmount =
      Number(sliderValue) * Number(pricePerUnit) + Number(minInvestAmount);
    setInvestmentAmount(isNaN(calculatedAmount) ? 0 : calculatedAmount);
  }, [sliderValue, pricePerUnit]);

  const handleSliderChange = (value: number | number[]) => {
    if (typeof value === "number") {
      setSliderValue(value);
    } else if (Array.isArray(value) && value.length > 0) {
      setSliderValue(value[0]);
    } else {
      setSliderValue(0);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };
  
  const handleAcceptInvestment = async () => {
    const totalInvestmentAmount = Number(investmentAmount);
    console.log("Investment amount:", totalInvestmentAmount);
    console.log("Deal ID:", dealId);
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_URI}api/investor/${localStorage.getItem(
          "userId"
        )}/investments/${dealId}/`,
        {
          data: {
            attributes: {
              investment_amount: totalInvestmentAmount,
            },
          },
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      alert("Investment accepted successfully.");
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        // Token expired, try to refresh
        try {
          const refreshToken = localStorage.getItem("refreshToken");
          const refreshResponse = await axios.post(
            `${process.env.NEXT_PUBLIC_URI}api/auths/refresh-token/`,
            {
              data: {
                attributes: {
                  "refresh-token": refreshToken,
                },
              },
            }
          );

          const newAccessToken = refreshResponse.data.data.access;
          localStorage.setItem("accessToken", newAccessToken);

          // Retry the original request with the new access token
          const retryResponse = await axios.post(
            `${process.env.NEXT_PUBLIC_URI}api/investor/${localStorage.getItem(
              "userId"
            )}/investments/${dealId}/`,
            {
              data: {
                attributes: {
                  investment_amount: totalInvestmentAmount,
                },
              },
            },
            {
              headers: {
                Authorization: `Bearer ${newAccessToken}`,
              },
            }
          );
          alert("Investment accepted successfully.");
        } catch (refreshError) {
          console.error("Error refreshing token:", refreshError);
          alert(
            "Session expired or you are not logged in. Please log in again."
          );
        }
      } else {
        console.error(
          "Error accepting investment, make sure you are currently log in as an investor and try again.",
          error
        );
      }
    }
  };

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
                  label="Select investment units"
                  color="foreground"
                  step={1}
                  minValue={1}
                  maxValue={maxMultiplier}
                  marks={[
                    { value: 1, label: "1" },
                    { value: 4, label: "4" },
                    { value: 7, label: "7" },
                    { value: maxMultiplier, label: `${maxMultiplier}` },
                  ]}
                  defaultValue={1}
                  value={sliderValue}
                  onChange={handleSliderChange}
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
                <div className="mt-4 text-[20px] text-secondary">
                  Total amount:
                </div>
                <div className="mt-1 text-[36px] text-black font-bold">
                  {formatCurrency(investmentAmount)}
                </div>
              </ModalBody>
              <ModalFooter>
                <div className="flex flex-row w-full h-full gap-4 items-center">
                  <div
                    className="w-full flex items-center justify-center border-[2px] border-red rounded-[8px] text-red text-[20px] hover:cursor-pointer"
                    onClick={onClose}
                  >
                    Cancel
                  </div>
                  <div
                    className={`w-full flex items-center justify-center ${
                      sliderValue === 0 ? "bg-gray-400" : "bg-purple"
                    } border-[2px] border-purple rounded-[8px] text-white text-[20px] ${
                      sliderValue === 0 ? "" : "hover:cursor-pointer"
                    }`}
                    onClick={
                      sliderValue === 0 ? undefined : handleAcceptInvestment
                    }
                  >
                    Accept
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
