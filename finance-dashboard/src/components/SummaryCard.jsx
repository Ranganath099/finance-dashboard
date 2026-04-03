export default function SummaryCard({ title, value }) {
  return (
    <div className="card">
      <p className="text-gray-500 text-sm">{title}</p>
      <h2 className="text-2xl font-bold mt-1">₹ {value}</h2>
    </div>
  );
}