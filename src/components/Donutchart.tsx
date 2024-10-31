"use client";

import React, { useEffect, useRef } from "react";
import { Chart, DoughnutController, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

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

interface DoughnutChartProps {
    investments: Investment[];
}

const DoughnutChart: React.FC<DoughnutChartProps> = ({ investments }) => {
    const chartRef = useRef<HTMLCanvasElement | null>(null);
    const chartInstanceRef = useRef<Chart | null>(null);

    useEffect(() => {
        if (chartRef.current && investments.length > 0) {
            const ctx = chartRef.current.getContext("2d");
            
            // Destroy existing chart if it exists
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }

            if (ctx) {
                // Process the data to get deal percentages
                const dealCounts: { [key: string]: number } = {};
                let total = 0;

                // Count occurrences of each deal
                investments.forEach(investment => {
                    const dealName = investment.attributes.deal;
                    dealCounts[dealName] = (dealCounts[dealName] || 0) + 1;
                    total++;
                });

                // Calculate percentages and prepare chart data
                const labels = Object.keys(dealCounts);
                const data = labels.map(label => (dealCounts[label] / total) * 100);

                // Create color array based on number of unique deals
                const colors = [
                    '#9710FF',
                    '#B084FF',
                    '#D3C4FF',
                    '#E6D5FF',
                    '#F0E6FF'
                ];

                chartInstanceRef.current = new Chart(ctx, {
                    type: "doughnut",
                    data: {
                        labels: labels,
                        datasets: [
                            {
                                data: data,
                                backgroundColor: colors.slice(0, labels.length),
                                hoverOffset: 4,
                            }
                        ]
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'bottom',
                                labels: {
                                    usePointStyle: true,
                                }
                            },
                            tooltip: {
                                callbacks: {
                                    label: function(context) {
                                        return `${context.label}: ${context.raw.toFixed(1)}%`;
                                    }
                                }
                            }
                        },
                        cutout: '70%',
                    }
                });
            }
        }

        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }
        };
    }, [investments]);

    return (
        <div style={{ width: '100%', height: '300px' }} className="flex items-center justify-center">
            <canvas ref={chartRef} width="50" height="50"></canvas>
        </div>
    );
};

export default DoughnutChart;