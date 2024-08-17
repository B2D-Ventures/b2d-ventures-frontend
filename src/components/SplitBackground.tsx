import React from 'react';

export default function SplitBackground({}) {
  return (
  <div
  className="flex h-screen items-center justify-center"
  style={{background: 'linear-gradient(to right, #FFFFFF 50%, #4E0A81 50%)'}}>
    <div className="bg-white p-1 rounded-lg shadow-lg border-2 border-[#D9D9D9]" style={{ width: '1200px', height: '800px' }}>
      <div className="flex h-full">
        <div className="flex-1 bg-white text-center mt-12">
          <div className="inline-block space-x-2">
            <p className="text-[#625B71] text-4xl font-bold inline">Welcome to</p>
            <p className="text-[#000000] text-4xl font-bold inline">B2D</p>
          </div>

          <div className='my-12'>
            <button className="bg-[#FFFFFF] text-[#000000] py-2 px-6 rounded-lg border-2 border-[#D9D9D9] shadow-md hover:shadow-lg">
          Sign in 
            </button>
          </div>
          
          <div className='flex justify-between mt-24'>
            <button className="bg-[#FFFFFF] text-[#000000] py- px-4 rounded-lg border-2 border-[#D9D9D9] shadow-md hover:shadow-lg">
              LORE MERN
            </button>
            <button className="bg-[#FFFFFF] text-[#000000] py-2 px-4 rounded-lg border-2 border-[#D9D9D9] shadow-md hover:shadow-lg">
              PYLICO
            </button>
          </div>
        </div>


        <div className="flex-1 flex items-center justify-center">
          <p className='text-4xl font-bold'>
            รูปนะ
          </p>
        </div>
      </div>
    </div>
  </div>
  );
};
