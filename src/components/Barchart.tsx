"use client";

import React, { useEffect, useRef } from "react";
import { Chart, BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

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

interface BarChartProps {
    investments: Investment[];
}

const BarChart: React.FC<BarChartProps> = ({ investments }) => {
    const chartRef = useRef<HTMLCanvasElement | null>(null);
    const chartInstanceRef = useRef<Chart | null>(null);

    useEffect(() => {
        const ctx = chartRef.current?.getContext("2d");
        if (ctx && investments.length > 0) {
            // Destroy existing chart if it exists
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }

            // Process the investment data
            const processedData = investments.map(inv => ({
                amount: parseFloat(inv.attributes.investment_amount),
                date: new Date(inv.attributes.investment_date).toLocaleDateString()
            }));

            // Sort by date
            processedData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

            // Create new chart
            chartInstanceRef.current = new Chart(ctx, {
                type: "bar",
                data: {
                    labels: processedData.map(item => item.date),
                    datasets: [
                        {
                            label: 'Investment Amount (USD)',
                            data: processedData.map(item => item.amount),
                            backgroundColor: '#9710FF',
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Investment Amount (USD)'
                            }
                        },
                        x: {
                            title: {
                                display: true,
                                text: 'Investment Date'
                            }
                        }
                    }
                }
            });
        }

        // Cleanup function
        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }
        };
    }, [investments]);

    return (
        <div style={{ width: '100%', height: '300px' }}>
            <canvas ref={chartRef} style={{ width: '100%', height: '100%' }}></canvas>
        </div>
    );
};

export default BarChart;