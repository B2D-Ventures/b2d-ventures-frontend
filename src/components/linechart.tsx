"use client";

import React, { useEffect, useRef } from "react";
import { Chart, LineController, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend } from "chart.js";

Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

interface Investment {
    type: string;
    id: string;
    attributes: {
        id: string;
        investor: string;
        deal: string;
        investment_amount: string;
        investment_date: string;  // Using investment_date instead of date_joined
    };
}

interface LineChartProps {
    investments: Investment[];
}

const LineChart: React.FC<LineChartProps> = ({ investments }) => {
    const chartRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const processData = () => {
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            // Update this filter to use investment_date instead of date_joined
            const todayInvestments = investments.filter(inv => {
                const invDate = new Date(inv.attributes.investment_date);
                return invDate.toDateString() === today.toDateString();
            });

            const hours = Array.from({length: 24}, (_, i) => i);
            
            const todayData = hours.map(hour => {
                return todayInvestments.filter(inv => {
                    const invDate = new Date(inv.attributes.investment_date);
                    return invDate.getHours() === hour;
                }).length;
            });

            return {
                hours: hours.map(h => h.toString().padStart(2, '0')),
                todayData,
            };
        };

        if (chartRef.current) {
            const ctx = chartRef.current.getContext("2d");
            if (ctx) {
                const existingChart = Chart.getChart(ctx);
                if (existingChart) {
                    existingChart.destroy();
                }

                const { hours, todayData } = processData();

                new Chart(ctx, {
                    type: "line",
                    data: {
                        labels: hours,
                        datasets: [
                            {
                                label: 'Today',
                                data: todayData,
                                borderColor: '#9710FF',
                                backgroundColor: 'rgba(151, 16, 255, 0.1)',
                                borderWidth: 2,
                                pointRadius: 3,
                                pointBackgroundColor: '#9710FF',
                                fill: true,
                                tension: 0.4
                            }
                        ]
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            legend: {
                                display: false
                            },
                            tooltip: {
                                mode: 'index',
                                intersect: false,
                                callbacks: {
                                    label: function(context) {
                                        return `Investments: ${context.parsed.y}`;
                                    }
                                }
                            }
                        },
                        scales: {
                            x: {
                                grid: {
                                    display: false,
                                },
                                title: {
                                    display: true,
                                    text: 'Hour'
                                },
                                ticks: {
                                    maxTicksLimit: 12,
                                    color: '#666'
                                }
                            },
                            y: {
                                beginAtZero: true,
                                grid: {
                                    color: 'rgba(0, 0, 0, 0.1)'
                                },
                                ticks: {
                                    stepSize: 1,
                                    color: '#666'
                                }
                            }
                        }
                    }
                });
            }
        }
    }, [investments]);

    return <canvas ref={chartRef} width="400" height="200"></canvas>;
};

export default LineChart;