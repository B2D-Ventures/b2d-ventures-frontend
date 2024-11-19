"use client";

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
  const [baseAmount, setBaseAmount] = useState(minInvestAmount);
  const [investmentAmount, setInvestmentAmount] = useState(
    minInvestAmount + pricePerUnit
  );
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const calculatedAmount =
      Number(baseAmount) + Number(sliderValue) * Number(pricePerUnit);
    // Ensure the amount is not negative
    const validAmount = Math.max(0, isNaN(calculatedAmount) ? 0 : calculatedAmount);
    setInvestmentAmount(validAmount);

    // Set error if amount is less than minimum
    if (validAmount < minInvestAmount) {
      setError(`Minimum investment amount is ${formatCurrency(minInvestAmount)}`);
    } else {
      setError("");
    }
  }, [sliderValue, pricePerUnit, baseAmount, minInvestAmount]);

  const handleSliderChange = (value: number | number[]) => {
    if (typeof value === "number") {
      setSliderValue(value);
    } else if (Array.isArray(value) && value.length > 0) {
      setSliderValue(value[0]);
    } else {
      setSliderValue(0);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numericValue = Number(value);

    if (!isNaN(numericValue)) {
      // Prevent negative values
      if (numericValue < 0) {
        setError("Investment amount cannot be negative");
        return;
      }

      // Check minimum investment amount
      if (numericValue < minInvestAmount) {
        setError(`Minimum investment amount is ${formatCurrency(minInvestAmount)}`);
      } else {
        setError("");
      }

      // Set the new base amount by subtracting the current unit additions
      const newBaseAmount = numericValue - sliderValue * pricePerUnit;
      setBaseAmount(Math.max(0, newBaseAmount)); // Ensure base amount is not negative
      setInvestmentAmount(numericValue);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const handleAcceptInvestment = async () => {
    // Validate investment amount before proceeding
    if (investmentAmount < minInvestAmount) {
      setError(`Minimum investment amount is ${formatCurrency(minInvestAmount)}`);
      return;
    }

    if (investmentAmount <= 0) {
      setError("Investment amount must be greater than zero");
      return;
    }

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
            "Please ensure you are logged in as a verified investor. Please try again later."
          );
        }
      } else {
        console.error("Error accepting investment.", error);
        alert(
          "Please ensure you are logged in as a verified investor. Please try again later."
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
          base: "rounded-[8px] w-[532px] h-[480px] px-4 py-4",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-[32px]">
                Invest deal
              </ModalHeader>
              <ModalBody>
                <Slider
                  label="Select investment units"
                  color="foreground"
                  step={1}
                  minValue={1}
                  maxValue={10}
                  marks={[
                    { value: 1, label: "1" },
                    { value: 4, label: "4" },
                    { value: 7, label: "7" },
                    { value: 10, label: "10" },
                  ]}
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
                <input
                  type="number"
                  value={investmentAmount}
                  onChange={handleInputChange}
                  min={0}
                  className="mt-4 w-full p-2 border rounded"
                />
                {error && (
                  <div className="mt-2 text-red text-sm">
                    {error}
                  </div>
                )}
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
                      sliderValue === 0 || error ? "bg-gray-400" : "bg-purple"
                    } border-[2px] border-purple rounded-[8px] text-white text-[20px] ${
                      sliderValue === 0 || error ? "" : "hover:cursor-pointer"
                    }`}
                    onClick={
                      sliderValue === 0 || error ? undefined : handleAcceptInvestment
                    }
                    data-testid="accept"
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