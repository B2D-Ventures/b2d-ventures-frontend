"use client";

import { useState, useEffect } from "react";
import DetailCard from "@/components/DetailCard";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface DealAttributes {
  id: string;
  name: string;
  content: string;
  description: string;
  image_logo_url: string;
  image_content_url: string;
  target_amount: string;
  price_per_unit: string;
  minimum_investment: string;
  amount_raised: string;
  end_date: string;
  image_background_url: string;
  startup: {
    id: string;
  };
}

interface Deal {
  attributes: DealAttributes;
}

function contentFormatter(content: string) {
  return content.replace(/<[^>]*>?/gm, "").replace(/\r\n/g, "<br/>");
}

export default function DealDashboard({
  params,
}: {
  params: { dealId: string };
}) {
  const id = params.dealId;
  const [deals, setDeals] = useState<Deal[]>([]);
  const [deal, setDeal] = useState<Deal | null>(null);

  const API_BASE_URL = `${process.env.NEXT_PUBLIC_URI}`;
  const DEFAULT_BG_IMAGE = "/images/lexi.png";
  const DEFAULT_ICON_IMAGE = "/images/icon.jpg";

  const Router = useRouter();

  const getImageSrc = (imagePath?: string, isIcon: boolean = false) => {
    if (!imagePath) return isIcon ? DEFAULT_ICON_IMAGE : DEFAULT_BG_IMAGE;
    const fullPath = imagePath.startsWith("http")
      ? imagePath
      : `${API_BASE_URL}${imagePath}`;
    return fullPath;
  };

  const fetchDeal = async () => {
    try {
      const response = await axios.get<{ data: Deal[] }>(
        `${process.env.NEXT_PUBLIC_URI}api/admin/deals`
      );
      setDeals(response.data.data);
      console.log("Deals fetched:", response.data.data);
    } catch (error) {
      console.error("Error fetching deals:", error);
      alert("Error fetching deals, please try again later.");
    }
  };

  useEffect(() => {
    fetchDeal();
  }, []);

  useEffect(() => {
    if (deals.length > 0) {
      const foundDeal = deals.find((deal) => deal.attributes.id === id);
      if (foundDeal) {
        setDeal(foundDeal);
        console.log("Deal found:", foundDeal);
      }
    }
  }, [deals, id]);
  
  const handleRequestData = (dealId: string, userId: string | null) => {
    return async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_URI}api/investor/${userId}/deals/${dealId}/request-dataroom/`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        alert(
          "Data requested successfully! Please check your email for more details."
        );
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
              `${process.env.NEXT_PUBLIC_URI}api/investor/${userId}/deals/${dealId}/request-dataroom/`,
              {},
              {
                headers: {
                  Authorization: `Bearer ${newAccessToken}`,
                },
              }
            );
            alert(
              "Data requested successfully! Please check your email for more details."
            );
          } catch (refreshError) {
            console.error("Error refreshing token:", refreshError);
            alert("Please ensure you are logged in as a verified investor. Please try again later.");
          }
        } else {
          console.error("Error requesting data:", error);
          alert("Please ensure you are logged in as a verified investor. Please try again later.");
        }
      }
    };
  };

  const handleEditDeal = (dealId: string) => {
    Router.push(`/edit-deal/${dealId}`);
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div className="w-full max-w-[1400px] px-4 sm:px-6 lg:px-[102px] py-6 lg:py-[54px]">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-16">
          {/* Left Column */}
          <div className="flex flex-col w-full lg:w-[793px]">
            {/* Header Section */}
            <div className="flex flex-row gap-4 items-center">
            <div className="relative w-[80px] h-[80px] overflow-hidden drop-shadow-md flex items-center justify-center rounded-md">
              <Image
                src={getImageSrc(deal?.attributes.image_logo_url, true)}
                alt="icon"
                width={80}
                height={80}
                className="rounded-md object-contain"
              />
            </div>
              <div className="text-2xl sm:text-3xl lg:text-[48px] font-bold">
                {deal ? deal.attributes.name : "Loading..."}
              </div>
            </div>

            {/* Description */}
            <div className="mt-1 text-base sm:text-lg lg:text-[20px] text-secondary mb-5">
              {deal ? deal.attributes.description : "Loading"}
            </div>

            {/* Main Image */}
            <div className="relative w-full aspect-[16/9] lg:h-[412px]">
              <Image
                src={getImageSrc(deal?.attributes.image_content_url)}
                fill
                alt="image"
                className="rounded-[8px] object-cover"
              />
            </div>

            {/* Content */}
            <div
              className="mt-4 text-sm sm:text-base"
              dangerouslySetInnerHTML={{
                __html: deal
                  ? contentFormatter(deal.attributes.content)
                  : "Loading...",
              }}
            />
          </div>

          {/* Right Column */}
          <div className="w-full lg:w-[378px] flex flex-col mt-6 lg:mt-[90px] gap-5">
            {/* Action Buttons */}
            <div className="flex flex-row justify-between w-full gap-4">
              <button
                data-testid="request-data-button"
                onClick={handleRequestData(id, localStorage.getItem("userId"))}
                className="flex-1 h-[44px] rounded-[8px] text-purple border-[2px] border-purple text-sm sm:text-base font-semibold hover:bg-purple hover:text-white transition-colors"
              >
                Request for private data
              </button>
              <Link
                data-testid="schedule-meeting-button"
                href={`/schedule-meeting?id=${deal?.attributes.startup.id}`}
                className="flex items-center justify-center border-2 border-border w-[44px] h-[44px] rounded-[8px]"
              >
                <img
                  src="/images/Phoneicon.png"
                  alt="Fund Icon"
                  className="w-6 h-6 opacity-50"
                />
              </Link>
            </div>

            {/* Detail Card */}
            <div className="w-full">
              {deal && (
                <DetailCard
                  target_amount={Number(deal.attributes.target_amount)}
                  pricePerFractionalUnit={Number(deal.attributes.price_per_unit)}
                  minimumInvestment={Number(deal.attributes.minimum_investment)}
                  amount_raised={Number(deal.attributes.amount_raised)}
                  fundingGoal={Number(deal.attributes.target_amount)}
                  dealEnd={deal.attributes.end_date}
                  image_bg={deal.attributes.image_background_url}
                  dealId={id}
                />
              )}
            </div>

            {/* Edit Deal Button */}
            {deal?.attributes.startup.id === localStorage.getItem("userId") && (
              <button
                data-testid="edit-deal-button"
                onClick={() => handleEditDeal(id)}
                className="w-full h-[44px] rounded-[8px] text-purple border-[2px] border-purple text-sm sm:text-base font-semibold hover:bg-purple hover:text-white transition-colors"
              >
                Edit Deal
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}