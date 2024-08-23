import React from 'react';
import Image from "next/image";

export default function SplitBackground({}) {
  return (
    <div
      className="flex h-screen items-center justify-center"
      style={{ background: 'linear-gradient(to right, #FFFFFF 50%, #4E0A81 50%)' }}
    >
      <div className="bg-white rounded-lg shadow-lg border-2 border-[#D9D9D9]" style={{ width: '1288px', height: '631px' }}>
        <div className="flex h-full">
          <div className="flex-1 flex flex-col justify-between bg-white text-center">
            <div>
              <div className="inline-block space-x-2 mt-12">
                <p className="text-[#625B71] text-4xl font-bold inline">Welcome to</p>
                <p className="text-[#000000] text-4xl font-bold inline">B2D</p>
              </div>
              <div className='flex justify-center my-12'>
                <button className="bg-[#FFFFFF] text-[#000000] py-2 px-6 rounded-xl border-2 border-[#D9D9D9] shadow-md hover:shadow-lg w-4/5 font-medium flex items-center justify-center space-x-2">
                  <Image src="/images/Google_icons.png" width={20} height={20} alt="Google Icon" />
                  <span>Sign in with Google</span>
                </button>
              </div>
            </div>
            <div className='flex justify-between mb-12 mx-12'>
              <button className="bg-[#FFFFFF] text-[#000000] py-2 px-4 rounded-lg border-2 border-[#D9D9D9] shadow-md hover:shadow-lg w-1/3">
                LEARN MORE
              </button>
              <button className="bg-[#FFFFFF] text-[#000000] py-2 px-4 rounded-lg border-2 border-[#D9D9D9] shadow-md hover:shadow-lg w-1/3">
                POLICY
              </button>
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <Image src="/images/image_4.png" width={1288} height={315} alt="image" />
          </div>
        </div>
      </div>
    </div>
  );
};
