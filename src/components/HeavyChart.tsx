"use client";

import { memo, useMemo } from "react";

interface DataPoint {
  label: string;
  value: number;
  color: string;
}

interface HeavyChartProps {
  data?: DataPoint[];
  title?: string;
}

function HeavyChart({ data, title = "Performance Metrics" }: HeavyChartProps) {
  const chartData = useMemo(() => {
    if (data) return data;
    
    return [
      { label: "Jan", value: 65, color: "#5a6bff" },
      { label: "Feb", value: 78, color: "#5a6bff" },
      { label: "Mar", value: 52, color: "#5a6bff" },
      { label: "Apr", value: 91, color: "#10b981" },
      { label: "May", value: 84, color: "#5a6bff" },
      { label: "Jun", value: 73, color: "#5a6bff" },
      { label: "Jul", value: 96, color: "#10b981" },
      { label: "Aug", value: 67, color: "#5a6bff" },
      { label: "Sep", value: 88, color: "#5a6bff" },
      { label: "Oct", value: 72, color: "#5a6bff" },
      { label: "Nov", value: 95, color: "#10b981" },
      { label: "Dec", value: 81, color: "#5a6bff" },
    ];
  }, [data]);

  const maxValue = useMemo(() => Math.max(...chartData.map((d) => d.value)), [chartData]);

  return (
    <div className="w-full p-6 glass rounded-2xl">
      <h3 className="font-display text-lg font-semibold mb-6">{title}</h3>
      
      <div className="flex items-end justify-between gap-2 h-48">
        {chartData.map((point, index) => (
          <div
            key={point.label}
            className="flex flex-col items-center gap-2 flex-1"
          >
            <div className="relative w-full flex justify-center">
              <div
                className="w-full max-w-8 rounded-t-lg transition-all duration-500 ease-out"
                style={{
                  height: `${(point.value / maxValue) * 160}px`,
                  backgroundColor: point.color,
                  animationDelay: `${index * 50}ms`,
                }}
              />
            </div>
            <span className="text-xs text-midnight-400">{point.label}</span>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-midnight-500" />
            <span className="text-midnight-400">Regular</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-jade-500" />
            <span className="text-midnight-400">Peak</span>
          </div>
        </div>
        <span className="text-midnight-500">
          Avg: {Math.round(chartData.reduce((a, b) => a + b.value, 0) / chartData.length)}%
        </span>
      </div>
    </div>
  );
}

export default memo(HeavyChart);

