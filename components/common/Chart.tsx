import { LineChart, Line, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const chartData = [
  { date: "2024-06-01", visitors: 150, registrations: 80 },
  { date: "2024-06-02", visitors: 200, registrations: 90 },
  { date: "2024-06-03", visitors: 250, registrations: 120 },
  { date: "2024-06-04", visitors: 220, registrations: 100 },
  { date: "2024-06-05", visitors: 300, registrations: 180 },
];

export default function ChartComponent() {
  return (
    <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-center mb-4">📈 방문자 & 이메일 등록 수 추이</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <Tooltip />
          <Line type="monotone" dataKey="visitors" stroke="#2563eb" strokeWidth={2} name="방문자 수" />
          <Line type="monotone" dataKey="registrations" stroke="#f59e0b" strokeWidth={2} name="이메일 등록 수" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
