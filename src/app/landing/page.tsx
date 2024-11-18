"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Custom arrow components
const NextArrow = (props: { onClick: () => void }) => {
  const { onClick } = props;
  return (
    <div
      className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer z-10"
      onClick={onClick}
    >
      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 18L15 12L9 6"
            stroke="#4E0A81"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
};

const PrevArrow = (props: { onClick: () => void }) => {
  const { onClick } = props;
  return (
    <div
      className="absolute left-4 top-1/2 -translate-y-1/2 cursor-pointer z-10"
      onClick={onClick}
    >
      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 18L9 12L15 6"
            stroke="#4E0A81"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
};

export default function Page() {
  const router = useRouter();

  const handleOnclick = () => {
    router.push("/startup");
  };

  // Carousel settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    nextArrow: <NextArrow onClick={() => {}} />,
    prevArrow: <PrevArrow onClick={() => {}} />,
    customPaging: (i: number) => (
      <div className="w-2 h-2 bg-gray-300 rounded-full mt-4 hover:bg-purple"></div>
    ),
  };

  // Carousel items
  const carouselItems = [
    {
      title: "Be a part of the world's most ambitious ventures",
      description:
        "B2D's financial ecosystem unlocks private markets for investors and institutions across the globe.",
      image: "/images/landing.png",
    },
    {
      title: "Invest in the future of technology",
      description:
        "Access exclusive opportunities in breakthrough technologies and innovative startups.",
      image: "/images/investor.jpg",
    },
    {
      title: "Join our global investment community",
      description:
        "Connect with like-minded investors and discover new opportunities together.",
      image: "/images/city_view.avif",
    },
    {
      title: "Empower your investment portfolio",
      description:
        "Diversify your investments with access to a wide range of private market opportunities.",
      image: "/images/portfolio.jpg",
    },
    {
      title: "Unlock new growth potential",
      description:
        "Invest in high-growth startups and scale-ups that are shaping the future.",
      image: "/images/Stonks.jpg",
    },
    {
      title: "Experience seamless investment",
      description:
        "Our platform provides a seamless and secure investment experience for all users.",
      image: "/images/seamless.png",
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section with Carousel */}
      <div className="relative bg-gradient-to-b from-purple to-[#4E0A81]">
        <Slider {...settings}>
          {carouselItems.map((item, index) => (
            <div key={index}>
              <div className="flex flex-col lg:flex-row min-h-[400px] lg:h-[600px] p-6 lg:p-0">
                <div className="flex flex-col w-full items-center lg:items-start justify-center px-4 lg:px-[135px] text-center lg:text-left">
                  <div className="text-white text-[32px] lg:text-[48px] font-bold mb-4 lg:mb-8">
                    {item.title}
                  </div>
                  <div className="text-white text-[18px] lg:text-[24px] mb-4 lg:mb-8">
                    {item.description}
                  </div>
                  <div
                    className="flex items-center justify-center w-full max-w-[292px] h-[50px] lg:h-[71px] bg-purple text-white text-[24px] lg:text-[32px] rounded-[8px] cursor-pointer"
                    onClick={handleOnclick}
                  >
                    Start investing
                  </div>
                </div>
                <Image
                  src={item.image}
                  width={500}
                  height={500}
                  alt={`slide-${index}`}
                  className="h-auto lg:h-full w-full lg:w-auto mt-6 lg:mt-0 lg:ml-auto object-contain"
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Stats Section */}
      <div className="flex flex-col lg:flex-row items-center justify-center py-8 lg:py-0 lg:h-[220px] bg-white gap-8 lg:gap-10 px-4">
        <div className="flex flex-col items-center lg:items-start justify-center text-center lg:text-left">
          <div className="text-[28px] lg:text-[32px] font-bold">3M+</div>
          <div className="text-[20px] lg:text-[24px]">Global investor community</div>
        </div>
        <div className="hidden lg:block w-[1px] h-[114px] bg-secondary"></div>
        <div className="flex flex-col items-center lg:items-start justify-center text-center lg:text-left">
          <div className="text-[28px] lg:text-[32px] font-bold">2,500+</div>
          <div className="text-[20px] lg:text-[24px]">Ventures supported</div>
        </div>
        <div className="hidden lg:block w-[1px] h-[114px] bg-secondary"></div>
        <div className="flex flex-col items-center lg:items-start justify-center text-center lg:text-left">
          <div className="text-[28px] lg:text-[32px] font-bold">32</div>
          <div className="text-[20px] lg:text-[24px]">Unicorns in portfolio</div>
        </div>
      </div>

      {/* Disclaimer Section */}
      <div className="flex items-center justify-center text-white text-center p-6 lg:h-[120px] bg-[#4E0A81] text-[14px] lg:text-base">
        Private investments are highly risky, illiquid and may result in total
        loss of capital. Learn more
      </div>
    </div>
  );
}