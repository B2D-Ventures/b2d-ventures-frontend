"use client";

import React, { useEffect, useRef } from "react";
import { Chart, LineController, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend } from "chart.js";

Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

const LineChart = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        new Chart(ctx, {
          type: "line",
          data: {
            labels: ['10', '11', '12', '13', '14', '15'],
            datasets: [
              {
                label: 'Today',
                data: [5, 10, 5, 8, 3, 15],
                borderColor: '#9710FF',
                backgroundColor: 'transparent',
                borderWidth: 2,
                pointRadius: 0,
              },
              {
                label: 'This week',
                data: [8, 5, 6, 10, 7, 9],
                borderColor: '#D3D3D3',
                backgroundColor: 'transparent',
                borderWidth: 2,
                pointRadius: 0,
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
              }
            },
            scales: {
              x: {
                grid: {
                  display: false,
                }
              },
              y: {
                beginAtZero: true,
                grid: {
                  // drawBorder: false,
                }
              }
            }
          }
        });
      }
    }
  }, []);

  return <canvas ref={chartRef} width="400" height="200"></canvas>;
};

export default LineChart;