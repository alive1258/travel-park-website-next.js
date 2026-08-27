"use client";

import { useMemo } from "react";
import {
  Bar,
  BarChart,
  Cell,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { BookingItem } from "@/src/types/bookingType";

interface BookingStatusChartProps {
  bookings: BookingItem[];
}

// Mirrors the badge colors already used on the Bookings pages (AllBookings /
// MyBookings), so a status reads the same color here as it does everywhere
// else in the dashboard: pending = warning, confirmed = good, cancelled =
// critical. "Completed" isn't a status-palette role, so it keeps the
// categorical blue those pages already paint it with.
const STATUS_CONFIG = [
  { key: "pending", label: "Pending", color: "#fab219" },
  { key: "confirmed", label: "Confirmed", color: "#0ca30c" },
  { key: "completed", label: "Completed", color: "#2a78d6" },
  { key: "cancelled", label: "Cancelled", color: "#d03b3b" },
];

function CustomTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: { payload: { label: string; count: number } }[];
}) {
  if (!active || !payload || payload.length === 0) return null;
  const { label, count } = payload[0].payload;
  return (
    <div className="rounded-lg border border-black/10 bg-white px-3 py-2 shadow-md">
      <p className="text-xs font-semibold text-gray-500">{label}</p>
      <p className="text-sm font-bold text-gray-900">{count} bookings</p>
    </div>
  );
}

export default function BookingStatusChart({ bookings }: BookingStatusChartProps) {
  const data = useMemo(() => {
    const counts: Record<string, number> = {};
    bookings.forEach((booking) => {
      const status = (booking.status || "pending").toLowerCase();
      counts[status] = (counts[status] || 0) + 1;
    });

    return STATUS_CONFIG.map((s) => ({
      ...s,
      count: counts[s.key] || 0,
    }));
  }, [bookings]);

  if (bookings.length === 0) {
    return (
      <div className="h-55 flex flex-col items-center justify-center text-center p-6">
        <p className="text-gray-900 font-bold text-sm">No bookings yet</p>
        <p className="text-xs text-gray-500 mt-1">
          Booking status breakdown will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="h-55 w-full">
      <ResponsiveContainer width="100%" height="100%" minHeight={220}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 0, right: 24, left: 0, bottom: 0 }}
        >
          <XAxis type="number" hide />
          <YAxis
            dataKey="label"
            type="category"
            tick={{ fontSize: 12, fill: "#52514e", fontWeight: 600 }}
            axisLine={false}
            tickLine={false}
            width={80}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f9f9f7" }} />
          <Bar dataKey="count" radius={[0, 4, 4, 0]} maxBarSize={22}>
            {data.map((entry) => (
              <Cell key={entry.key} fill={entry.color} />
            ))}
            <LabelList
              dataKey="count"
              position="right"
              style={{ fontSize: 12, fontWeight: 700, fill: "#0b0b0b" }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
