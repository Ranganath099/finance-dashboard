import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useFinance } from "../context/FinanceContext";

export default function CategoryChart() {
  const { transactions } = useFinance();

  //  Dynamic category  (income + expense)
  const data = Object.values(
    transactions.reduce((acc, t) => {
      acc[t.category] = acc[t.category] || {
        name: t.category,
        value: 0,
      };
      acc[t.category].value += t.amount;
      return acc;
    }, {})
  );

  //  Dynamic colors (unlimited)
  const getColor = (index) => {
    const hue = (index * 137) % 360;
    return `hsl(${hue}, 70%, 55%)`;
  };

  // Label
  const renderLabel = ({ percent }) =>
    `${(percent * 100).toFixed(0)}%`;

  //  Handle empty data
  if (data.length === 0) {
    return (
      <div className="flex justify-center items-center h-[300px] text-gray-400">
        No data available
      </div>
    );
  }

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer>
        <PieChart>

          {/* PIE */}
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={3}
            label={data.length < 8 ? renderLabel : false}
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={getColor(index)} />
            ))}
          </Pie>

          {/* TOOLTIP */}
          <Tooltip
            formatter={(value) => `₹${value}`}
            contentStyle={{
              borderRadius: "10px",
              border: "none",
            }}
          />

          {/* LEGEND */}
          <Legend
            layout="horizontal"
            verticalAlign="bottom"
            wrapperStyle={{ fontSize: "12px" }}
          />

        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}