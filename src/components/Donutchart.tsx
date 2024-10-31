"use client";

import React, { useEffect, useRef } from "react";
import { 
    Chart as ChartJS, 
    DoughnutController, 
    ArcElement, 
    Tooltip, 
    Legend, 
    ChartData, 
    ChartOptions,
    ChartType
} from "chart.js";

ChartJS.register(DoughnutController, ArcElement, Tooltip, Legend);

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

type ChartJSType = ChartJS<"doughnut", number[], string>;

const DoughnutChart: React.FC<DoughnutChartProps> = ({ investments }) => {
    const chartRef = useRef<HTMLCanvasElement | null>(null);
    const chartInstanceRef = useRef<ChartJSType | null>(null);

    useEffect(() => {
        if (chartRef.current && investments.length > 0) {
            const ctx = chartRef.current.getContext("2d");
            
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }

            if (ctx) {
                const dealCounts: { [key: string]: number } = {};
                let total = 0;

                investments.forEach(investment => {
                    const dealName = investment.attributes.deal;
                    dealCounts[dealName] = (dealCounts[dealName] || 0) + 1;
                    total++;
                });

                const labels = Object.keys(dealCounts);
                const data = labels.map(label => (dealCounts[label] / total) * 100);

                const colors = [
                    '#9710FF',
                    '#B084FF',
                    '#D3C4FF',
                    '#E6D5FF',
                    '#F0E6FF'
                ];

                const chartData: ChartData<'doughnut'> = {
                    labels: labels,
                    datasets: [
                        {
                            data: data,
                            backgroundColor: colors.slice(0, labels.length),
                            hoverOffset: 4,
                        }
                    ]
                };

                const chartOptions: ChartOptions<'doughnut'> = {
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
                                    return `${context.label}: ${context.parsed.toFixed(1)}%`;
                                }
                            }
                        }
                    },
                    cutout: '70%',
                };

                chartInstanceRef.current = new ChartJS(ctx, {
                    type: 'doughnut',
                    data: chartData,
                    options: chartOptions,
                }) as ChartJSType;
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