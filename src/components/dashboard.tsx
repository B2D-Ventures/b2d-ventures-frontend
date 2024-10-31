"use client";

import React, { useEffect, useState } from "react";
import BarChart from "@/components/Barchart";
import DoughnutChart from "@/components/Donutchart";
import LineChart from "./linechart";

// Define types for the API response
interface Statistics {
    total_users: number;
    total_deals: number;
    active_deals: number;
    total_investments: number;
    total_investment_amount: number;
    total_meetings: number;
    upcoming_meetings: number;
}

interface Investment {
    type: string;
    id: string;
    attributes: {
        id: string;
        investor: string;
        deal: string;
        investment_amount: string;
        investment_date: string;
    };
}


interface DashboardData {
    data: {
        attributes: {
            statistics: Statistics;
            recent_investments: Investment[];
        };
    };
}


export default function Dashboard() {
    const [statistics, setStatistics] = useState<Statistics | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [investments, setInvestments] = useState<Investment[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const response = await fetch('http://127.0.0.1:8000/api/admin/dashboard/');
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const jsonData = await response.json();
                // Check if the data has the expected structure
                if (jsonData?.data?.attributes?.statistics) {
                    setStatistics(jsonData.data.attributes.statistics);
                    setInvestments(jsonData.data.attributes.recent_investments || []);
                } else {
                    throw new Error('Invalid data structure received from API');
                }
            } catch (err) {
                console.error('Error fetching data:', err);
                setError(err instanceof Error ? err : new Error('An error occurred'));
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-xl font-semibold">Loading dashboard data...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-xl font-semibold text-red-600">
                    Error loading dashboard: {error.message}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen grid grid-rows-2 grid-cols-3 gap-0">
            {/* Top Section */}
            <div className="row-span-1 col-span-2 border-b border-gray-400 p-4">
                <div className="mt-4 ml-8">
                    <h1 className="text-4xl font-bold">Admin Dashboard</h1>
                    <p className="text-lg text-gray-600 mt-2">Investment Amount.</p>
                    <p className="text-2xl font-bold mt-2">
                        USD {statistics?.total_investment_amount?.toLocaleString() ?? '0'}
                    </p>
                    <BarChart investments={investments} />
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
                <p className="text-lg text-gray-600 mt-2 ml-4">
                    {statistics?.total_investments ?? 0} investors
                </p>
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