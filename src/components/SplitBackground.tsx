"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function SplitBackground({}) {
  const router = useRouter();

  const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const GOOGLE_REDIRECT_URI = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI;
  const SCOPES = [
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/calendar",
    "https://www.googleapis.com/auth/calendar.events",
  ];

  const googleSignIn = () => {
    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=${SCOPES.join(
      " "
    )}&access_type=offline&prompt=consent`;
    window.location.href = url;
  };

  console.log(GOOGLE_CLIENT_ID);
  console.log(GOOGLE_REDIRECT_URI);

  return (
    <div
      className="flex h-screen items-center justify-center"
      style={{
        background: "linear-gradient(to right, #FFFFFF 50%, #4E0A81 50%)",
      }}
    >
      <div
        className="bg-white rounded-lg shadow-lg border-2 border-[#D9D9D9]"
        style={{ width: "1288px", height: "631px" }}
      >
        <div className="flex h-full">
          <div className="flex-1 bg-white text-center mt-12">
            <div className="inline-block space-x-2">
              <p className="text-[#625B71] text-4xl font-bold inline">
                Welcome to
              </p>
              <p className="text-[#000000] text-4xl font-bold inline">B2D</p>
            </div>

            <div className="my-12">
              <button className="bg-[#FFFFFF] text-[#000000] py-2 px-6 rounded-xl border-2 border-[#D9D9D9] shadow-md hover:shadow-lg w-4/5 font-medium"
              onClick={googleSignIn}>
                Sign in with Google
              </button>
            </div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <div className="flex justify-between mt-24 mx-24">
              <button className="bg-[#FFFFFF] text-[#000000] py- px-4 rounded-lg border-2 border-[#D9D9D9] shadow-md hover:shadow-lg w-1/3">
                LEARN MORE
              </button>
              <button className="bg-[#FFFFFF] text-[#000000] py-2 px-4 rounded-lg border-2 border-[#D9D9D9] shadow-md hover:shadow-lg w-1/3">
                POLICY
              </button>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center">
            <p className="text-4xl font-bold">
              <Image
                src="/images/image_4.png"
                width={1288}
                height={315}
                alt="image"
              />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
