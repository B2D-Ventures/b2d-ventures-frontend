"use client";
import React from 'react';
import Dashboard from '@/components/dashboard';
import { useRouter } from 'next/navigation';

const AdminPage: React.FC = () => {
  const router = useRouter();

  return (
    <div className="w-full min-h-screen">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-4 sm:py-6 lg:py-10">
        {/* Back Button */}
        <button
          onClick={() => router.push("/admin-approve")}
          className="group mb-6 flex items-center gap-2 text-[#9710FF] hover:text-[#8109df] 
                     transition-all duration-300 ease-in-out transform hover:-translate-x-1"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={2} 
            stroke="currentColor" 
            className="w-5 h-5 transition-transform duration-300 ease-in-out group-hover:scale-110"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" 
            />
          </svg>
          <span className="relative after:content-[''] after:absolute after:w-full after:h-0.5 
                          after:bg-[#8109df] after:left-0 after:bottom-0 after:origin-left 
                          after:scale-x-0 hover:after:scale-x-100 after:transition-transform 
                          after:duration-300 after:ease-in-out">
            Back to Approve Deal
          </span>
        </button>

        {/* Dashboard Component */}
        <Dashboard />
      </div>
    </div>
  );
};

export default AdminPage;