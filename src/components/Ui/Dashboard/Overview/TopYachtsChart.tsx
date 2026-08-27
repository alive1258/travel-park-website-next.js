"use client";

import { useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { BookingItem } from "@/src/types/bookingType";

interface TopYachtsChartProps {
  bookings: BookingItem[];
}

// Revenue Trend already owns the sequential blue hue; this is the second
// magnitude chart on the same screen, so it takes the next categorical slot
// (orange) as its own one-hue ramp — same rule the old products-by-category
// chart used.
const CHART_ORANGE = "#eb6834";
const MAX_YACHTS = 8;

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
}) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="rounded-lg border border-black/10 bg-white px-3 py-2 shadow-md">
      <p className="text-xs font-semibold text-gray-500">{label}</p>
      <p className="text-sm font-bold text-gray-900">
        {payload[0].value} bookings
      </p>
    </div>
  );
}

export default function TopYachtsChart({ bookings }: TopYachtsChartProps) {
  const data = useMemo(() => {
    const counts = new Map<string, number>();
    bookings.forEach((booking) => {
      const name = booking.yacht?.name || "Unknown Yacht";
      counts.set(name, (counts.get(name) || 0) + 1);
    });

    return Array.from(counts.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, MAX_YACHTS);
  }, [bookings]);

  if (bookings.length === 0) {
    return (
      <div className="h-64 flex flex-col items-center justify-center text-center p-6">
        <p className="text-gray-900 font-bold text-sm">No bookings yet</p>
        <p className="text-xs text-gray-500 mt-1">
          Your most-booked yachts will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%" minHeight={240}>
        <BarChart
          data={data}
          margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
        >
          <CartesianGrid
            vertical={false}
            stroke="#e1e0d9"
            strokeDasharray="3 3"
          />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 10, fill: "#898781" }}
            axisLine={{ stroke: "#c3c2b7" }}
            tickLine={false}
            interval={0}
            angle={-20}
            textAnchor="end"
            height={50}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "#898781" }}
            axisLine={false}
            tickLine={false}
            width={32}
            allowDecimals={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f9f9f7" }} />
          <Bar dataKey="count" fill={CHART_ORANGE} radius={[4, 4, 0, 0]} maxBarSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
