"use client";

import React, { useEffect, useRef } from "react";
import { Chart, DoughnutController, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

const DoughnutChart = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        new Chart(ctx, {
          type: "doughnut",
          data: {
            labels: ['Afternoon', 'Evening', 'Morning'],
            datasets: [
              {
                data: [40, 32, 28],
                backgroundColor: ['#9710FF', '#B084FF', '#D3C4FF'],
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
                    return `${context.label}: ${context.raw}%`;
                  }
                }
              }
            },
            cutout: '70%',
          }
        });
      }
    }
  }, []);

  return <div style={{ width: '100%', height: '300px' }} className="flex items-center justify-center">
            <canvas ref={chartRef} width="50" height="50"></canvas>
        </div>
};

export default DoughnutChart;