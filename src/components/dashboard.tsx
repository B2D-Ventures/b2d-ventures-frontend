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

    // Function to calculate top performers
    const getTopPerformers = (investments: Investment[]) => {
        const investorTotals = new Map<string, number>();

        investments.forEach((investment) => {
            const investor = investment.attributes.investor;
            const amount = parseFloat(investment.attributes.investment_amount);
            
            investorTotals.set(
                investor, 
                (investorTotals.get(investor) || 0) + amount
            );
        });

        return Array.from(investorTotals.entries())
            .sort(([, a], [, b]) => b - a)
            .slice(0, 4);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const response = await fetch('https://b2d-ventures-backend.onrender.com/api/admin/dashboard/');
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const jsonData = await response.json();
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
                <p className="text-2xl font-bold mt-2 mb-16">Stock Percentage</p>
                <DoughnutChart investments={investments} />
            </div>

            {/* Bottom Section - Recent Investments Column */}
            <div className="row-span-1 col-span-1 border-r border-gray-400 p-4 bg-green-300">
                <p className="text-2xl font-bold mt-2 ml-4">Recent Investments</p>
                <p className="text-lg text-gray-600 mt-2 ml-4">
                    {statistics?.total_investments ?? 0} investors
                </p>
                {investments.slice(0, 4).map((investment, index) => (
                    <React.Fragment key={investment.id}>
                        <div className="flex justify-between mt-4 mb-4">
                            <span className="text-base font-bold ml-4">
                                {investment.attributes.investor}
                            </span>
                            <span className="text-gray-500 mr-4">
                                {parseFloat(investment.attributes.investment_amount).toLocaleString()} USD
                            </span>
                        </div>
                        {index < 3 && <hr/>}
                    </React.Fragment>
                ))}
            </div>

            {/* Bottom Section - Top Performers Column */}
            <div className="row-span-1 col-span-1 border-r border-gray-400 p-4 bg-green-300">
                <p className="text-2xl font-bold mt-2 ml-4">Top Performers</p>
                <p className="text-lg text-gray-600 mt-2 ml-4">
                    Top performing investments
                </p>
                {getTopPerformers(investments).map(([investor, totalAmount], index) => (
                    <React.Fragment key={investor}>
                        <div className="flex justify-between mt-4 mb-4">
                            <span className="text-base font-bold ml-4">
                                {totalAmount.toLocaleString()} USD
                            </span>
                            <span className="text-gray-500 mr-4">
                                {investor}
                            </span>
                        </div>
                        {index < 4 && <hr/>}
                    </React.Fragment>
                ))}
            </div>

            {/* Bottom Section - Investment Today Column */}
            <div className="row-span-1 col-span-1 p-4 bg-green-300">
                <p className="text-2xl font-bold mt-2 ml-4 mb-2">Investment Today</p>
                {/* Calculate today's total investment amount */}
                {(() => {
                    const today = new Date();
                    const todayInvestments = investments.filter(inv => {
                        const invDate = new Date(inv.attributes.investment_date);
                        return invDate.toDateString() === today.toDateString();
                    });
                    const todayTotal = todayInvestments.reduce((sum, inv) => 
                        sum + parseFloat(inv.attributes.investment_amount), 0
                    );
                    return (
                        <p className="text-2xl font-bold mt-2 ml-4">
                            {todayTotal.toLocaleString()} USD
                        </p>
                    );
                })()}
                <div className="mb-12">
                </div>
                <LineChart investments={investments} />
            </div>
        </div>
    );
}