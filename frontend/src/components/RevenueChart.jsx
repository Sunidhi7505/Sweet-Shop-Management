import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

function RevenueChart({ data }) {
  const chartData = {
    labels: data.map((item) => item.name),
    datasets: [
      {
        label: 'Revenue (₹)',
        data: data.map((item) => item.revenue),
        backgroundColor: '#4f46e5'
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    }
  };

  return (
    <div style={{ height: '150px' }}>
      <Bar data={chartData} options={options} />
    </div>
  );
}

export default RevenueChart;
