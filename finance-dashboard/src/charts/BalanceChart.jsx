import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useFinance } from "../context/FinanceContext";

export default function BalanceChart() {
  const { transactions } = useFinance();

  //  Sort transactions by date
  const sortedTx = [...transactions].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  //  Running balance calculation
  let running = 0;
  const data = sortedTx.map((t) => {
    running += t.type === "income" ? t.amount : -t.amount;
    return { date: t.date, balance: running };
  });

  //  Handle empty data
  if (data.length === 0) {
    return (
      <div className="flex justify-center items-center h-[250px] text-gray-400">
        No data available
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={data}>
        
        {/* DATE FORMAT */}
        <XAxis
          dataKey="date"
          tickFormatter={(date) =>
            new Date(date).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
            })
          }
        />

        <Tooltip
          formatter={(value) => `₹${value}`}
        />

        <Line
          type="monotone"
          dataKey="balance"
          stroke="#2563eb"
          strokeWidth={2}
          dot={{ r: 3 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}