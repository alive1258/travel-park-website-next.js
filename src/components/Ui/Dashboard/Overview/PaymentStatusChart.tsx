"use client";

import { useMemo } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import type { BookingItem } from "@/src/types/bookingType";

interface PaymentStatusChartProps {
  bookings: BookingItem[];
}

// Mirrors the PAYMENT_BADGE colors already used on the Bookings pages:
// unpaid = neutral, deposit paid = warning, paid in full = good,
// refunded = critical. Status color, so it always ships with the label
// beside it in the legend below — never color alone.
const STATUS_CONFIG = [
  { key: "unpaid", label: "Unpaid", color: "#898781" },
  { key: "deposit_paid", label: "Deposit Paid", color: "#fab219" },
  { key: "paid_in_full", label: "Paid in Full", color: "#0ca30c" },
  { key: "refunded", label: "Refunded", color: "#d03b3b" },
];

function CustomTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: { payload: { label: string; count: number; percent: number } }[];
}) {
  if (!active || !payload || payload.length === 0) return null;
  const { label, count, percent } = payload[0].payload;
  return (
    <div className="rounded-lg border border-black/10 bg-white px-3 py-2 shadow-md">
      <p className="text-xs font-semibold text-gray-500">{label}</p>
      <p className="text-sm font-bold text-gray-900">
        {count} bookings &middot; {percent.toFixed(0)}%
      </p>
    </div>
  );
}

export default function PaymentStatusChart({ bookings }: PaymentStatusChartProps) {
  const { data, total } = useMemo(() => {
    const counts: Record<string, number> = {};
    bookings.forEach((booking) => {
      const status = (booking.payment_status || "unpaid").toLowerCase();
      counts[status] = (counts[status] || 0) + 1;
    });

    const totalCount = bookings.length;
    const rows = STATUS_CONFIG.map((s) => ({
      ...s,
      count: counts[s.key] || 0,
      percent: totalCount > 0 ? ((counts[s.key] || 0) / totalCount) * 100 : 0,
    })).filter((s) => s.count > 0);

    return { data: rows, total: totalCount };
  }, [bookings]);

  if (bookings.length === 0) {
    return (
      <div className="h-64 flex flex-col items-center justify-center text-center p-6">
        <p className="text-gray-900 font-bold text-sm">No bookings yet</p>
        <p className="text-xs text-gray-500 mt-1">
          Payment status breakdown will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative h-48 w-48">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="count"
              nameKey="label"
              cx="50%"
              cy="50%"
              innerRadius="62%"
              outerRadius="100%"
              paddingAngle={data.length > 1 ? 3 : 0}
              cornerRadius={4}
              stroke="none"
            >
              {data.map((entry) => (
                <Cell key={entry.key} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-black text-gray-900">{total}</span>
          <span className="text-[11px] font-semibold text-gray-500">
            Bookings
          </span>
        </div>
      </div>

      <ul className="grid w-full grid-cols-2 gap-x-3 gap-y-2">
        {data.map((entry) => (
          <li key={entry.key} className="flex items-center gap-1.5 text-xs">
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="truncate font-medium text-gray-600">
              {entry.label}
            </span>
            <span className="ml-auto font-bold text-gray-900">
              {entry.count}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
