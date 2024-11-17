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
                const response = await fetch(`${process.env.NEXT_PUBLIC_URI}api/admin/dashboard/`);
                
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
        <div className="min-h-screen">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                {/* Top Section - Investment Overview */}
                <div className="md:col-span-2 bg-white rounded-lg shadow-lg p-4" data-testid="general-inform">
                    <div className="space-y-4">
                        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">Admin Dashboard</h1>
                        <p className="text-base lg:text-lg text-gray-600">Investment Amount</p>
                        <p className="text-xl lg:text-2xl font-bold">
                            USD {statistics?.total_investment_amount?.toLocaleString() ?? '0'}
                        </p>
                        <div className="w-full h-[300px] md:h-[400px]">
                            <BarChart investments={investments} />
                        </div>
                    </div>
                </div>

                {/* Top Section - Stock Percentage */}
                <div className="bg-white rounded-lg shadow-lg p-4" data-testid="Stock Percentage">
                    <p className="text-xl lg:text-2xl font-bold mb-4">Stock Percentage</p>
                    <div className="w-full h-[250px] md:h-[300px]">
                        <DoughnutChart investments={investments} />
                    </div>
                </div>

                {/* Bottom Section - Recent Investments */}
                <div className="bg-green-300 rounded-lg shadow-lg p-4" data-testid="Recent Investments">
                    <div className="space-y-4">
                        <p className="text-xl lg:text-2xl font-bold">Recent Investments</p>
                        <p className="text-base lg:text-lg text-gray-600">
                            {statistics?.total_investments ?? 0} investors
                        </p>
                        <div className="space-y-4">
                            {investments.slice(0, 4).map((investment, index) => (
                                <div key={investment.id}>
                                    <div className="flex justify-between items-center py-2">
                                        <span className="text-sm lg:text-base font-bold">
                                            {investment.attributes.investor}
                                        </span>
                                        <span className="text-sm lg:text-base text-gray-500">
                                            {parseFloat(investment.attributes.investment_amount).toLocaleString()} USD
                                        </span>
                                    </div>
                                    {index < 3 && <hr className="border-gray-400"/>}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Section - Top Performers */}
                <div className="bg-green-300 rounded-lg shadow-lg p-4" data-testid="Top Performers">
                    <div className="space-y-4">
                        <p className="text-xl lg:text-2xl font-bold">Top Performers</p>
                        <p className="text-base lg:text-lg text-gray-600">
                            Top performing investments
                        </p>
                        <div className="space-y-4">
                            {getTopPerformers(investments).map(([investor, totalAmount], index) => (
                                <div key={investor}>
                                    <div className="flex justify-between items-center py-2">
                                        <span className="text-sm lg:text-base font-bold">
                                            {totalAmount.toLocaleString()} USD
                                        </span>
                                        <span className="text-sm lg:text-base text-gray-500">
                                            {investor}
                                        </span>
                                    </div>
                                    {index < 3 && <hr className="border-gray-400"/>}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Section - Investment Today */}
                <div className="bg-green-300 rounded-lg shadow-lg p-4" data-testid="Investment Today">
                    <div className="space-y-4">
                        <p className="text-xl lg:text-2xl font-bold">Investment Today</p>
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
                                <p className="text-xl lg:text-2xl font-bold">
                                    {todayTotal.toLocaleString()} USD
                                </p>
                            );
                        })()}
                        <div className="w-full h-[200px] md:h-[250px]">
                            <LineChart investments={investments} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}