import { Bar } from "react-chartjs-2";
import type { ChartData } from "chart.js";

type BarChartProps = {
  chartData: ChartData<"bar">;
};

export const BarChart = ({ chartData }: BarChartProps) => {
  return (
    <div className="w-full h-100 bg-linear-to-br from-zinc-900 to-black border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
      <div className="relative w-full h-full">
        <Bar
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              title: {
                display: true,
                text: "Last 7 Days Income",
                color: "#f4f4f5",
                font: {
                  size: 18,
                  weight: "bold",
                },
                padding: { bottom: 24 },
              },
              legend: {
                display: false
              },
              tooltip: {
                backgroundColor: "#18181b",
                titleColor: "#f4f4f5",
                bodyColor: "#a1a1aa",
                borderColor: "#3f3f46",
                borderWidth: 1,
                padding: 12,
                cornerRadius: 8,
                displayColors: false,
              }
            },
            scales: {
              x: {
                grid: {
                  display: false,
                },
                ticks: {
                  color: "#a1a1aa",
                  font: { size: 12 },
                },
                border: {
                  color: "#3f3f46",
                }
              },
              y: {
                beginAtZero: true,
                grid: {
                  color: "#27272a",
                },
                ticks: {
                  color: "#a1a1aa",
                  font: { size: 12 },
                },
                border: {
                  display: false,
                }
              }
            },
          }}
        />
      </div>
    </div>
  );
};