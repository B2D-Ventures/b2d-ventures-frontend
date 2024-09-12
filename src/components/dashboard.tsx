// dashboard.js
"use client";

import React from "react";
import BarChart from "@/components/Barchart";
import DoughnutChart from "@/components/Donutchart";
import LineChart from "@/components/linechart";

export default function dashboard({}) {
    return (
    <div className="min-h-screen grid grid-rows-2 grid-cols-3 gap-0">
        {/* Top Section */}
        <div className="row-span-1 col-span-2 border-b border-gray-400 p-4">
        <div className="mt-4 ml-8">
        <h1 className="text-4xl font-bold">Elon Must</h1>
            <p className="text-lg text-gray-600 mt-2">Investment Amount.</p>
            <p className="text-2xl font-bold mt-2">USD 2,005,643.78</p>
            <p className="text-lg mt-2">
            <span className="text-green">↑ 2.1%</span> <span className="text-gray-500">Profit</span>
            </p>
            <p className="text-gray-500 mt-4">Invest from 1-12 Dec, 2024</p>
            <BarChart />
        </div>
        </div>
        <div className="row-span-1 col-span-1 border-b border-l border-gray-400 p-4">
            <p className="text-2xl font-bold mt-2">Order Time</p>
            <p className="text-lg text-gray-600 mt-2 mb-16">From 1-6 Dec, 2024</p>
                <DoughnutChart />
            
        </div>

        {/* Bottom Section */}
        <div className="row-span-1 col-span-1 border-r border-gray-400 p-4 bg-green-200">
            <p className="text-2xl font-bold mt-2 ml-4">Stocks percentage</p>
            <p className="text-lg text-gray-600 mt-2 ml-4">Show percent of project rating</p>
        </div>
        <div className="row-span-1 col-span-1 border-r border-gray-400 p-4 bg-green-300">
            <p className="text-2xl font-bold mt-2 ml-4">Investment list </p>
            <p className="text-lg text-gray-600 mt-2 ml-4">175 investors</p>
            <div className="flex justify-between mt-4 mb-4">
                <span className="text-base font-bold ml-4">Buy Alerts</span>
                <span className="text-gray-500 mr-4">98,000 USD</span>
            </div>
            <hr/>
            <div className="flex justify-between mt-4 mb-4">
                <span className="text-base font-bold ml-4">LEXI</span>
                <span className="text-gray-500 mr-4">45,000 USD </span>
            </div>
            <hr/>
            <div className="flex justify-between mt-4 mb-4">
                <span className="text-base font-bold ml-4">Osprey</span>
                <span className="text-gray-500 mr-4">19,000 USD </span>
            </div>
            <hr/>
            <div className="flex justify-between mt-4 mb-4">
                <span className="text-base font-bold ml-4">Plan Me</span>
                <span className="text-gray-500 mr-4">4,000 USD </span>
            </div>
        </div>
        <div className="row-span-1 col-span-1 p-4 bg-green-400">
            <p className="text-2xl font-bold mt-2 ml-4">Investment today</p>
            <p className="text-2xl font-bold mt-2 ml-4">100.43 USD</p>
            <div className="mb-12">
                <span className="text-red ml-4">↓ 2.1%</span> <span className="text-gray-500">Profit</span>
            </div>
            <LineChart />
        </div>
    </div>
    );
}