"use client";

import React, { useEffect, useRef } from "react";
import { Chart, BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BarChart = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    const ctx = chartRef.current?.getContext("2d");
    if (ctx) {
      // Destroy existing chart if it exists
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      // Create new chart
      chartInstanceRef.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
          datasets: [
            {
              label: 'Last 6 days',
              data: [12, 19, 3, 5, 2, 3, 10, 15, 7, 8, 12, 14],
              backgroundColor: '#9710FF',
            },
            {
              label: 'Last Week',
              data: [8, 11, 5, 6, 9, 10, 4, 7, 3, 5, 6, 8],
              backgroundColor: '#E6E8EC',
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true
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
  }, []);

  return (
    <div style={{ width: '100%', height: '300px' }}>
      <canvas ref={chartRef} style={{ width: '100%', height: '100%' }}></canvas>
    </div>
  );
};

export default BarChart;