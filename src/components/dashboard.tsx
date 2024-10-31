"use client";

import React, { useEffect, useState } from "react";
import BarChart from "@/components/Barchart";
import DoughnutChart from "@/components/Donutchart";
import LineChart from "./linechart";

// Define types for the data structures
interface InvestmentAttributes {
    id: string;
    investor: string;
    deal: string;
    investment_amount: string;
    investment_date: string;
}

interface Investment {
    type: string;
    id: string;
    attributes: InvestmentAttributes;
}

interface Statistics {
    total_users: number;
    total_deals: number;
    active_deals: number;
    total_investments: number;
    total_investment_amount: number;
    total_meetings: number;
    upcoming_meetings: number;
}

interface DashboardData {
    recent_investments: Investment[];
    attributes: {
        statistics: Statistics;
    };
}

export default function Dashboard() {
    const [data, setData] = useState<DashboardData | null>(null);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/admin/dashboard/');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const jsonData: DashboardData = await response.json();
                setData(jsonData);
            } catch (error) {
                setError(error as Error);
            }
        }

        fetchData();
    }, []);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!data) {
        return <div>Loading...</div>;
    }

    // Safely destructure data
    const recent_investments = data.recent_investments || [];
    const statistics = data.attributes?.statistics || {
        total_users: 0,
        total_deals: 0,
        active_deals: 0,
        total_investments: 0,
        total_investment_amount: 0,
        total_meetings: 0,
        upcoming_meetings: 0,
    };

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
                {recent_investments.map((investment) => (
                    <div key={investment.id} className="flex justify-between mt-4 mb-4">
                        <span className="text-base font-bold ml-4">{investment.attributes.deal}</span>
                        <span className="text-gray-500 mr-4">{investment.attributes.investment_amount} USD</span>
                    </div>
                ))}
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