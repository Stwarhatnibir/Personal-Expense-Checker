import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function MonthlySummary({ expenses }) {
  // Group expenses by month and category
  const monthlyData = expenses.reduce((acc, expense) => {
    const month = expense.date.slice(0, 7); // YYYY-MM
    if (!acc[month]) acc[month] = { month };

    acc[month][expense.category] =
      (acc[month][expense.category] || 0) + Number(expense.amount);
    acc[month].total = (acc[month].total || 0) + Number(expense.amount);

    return acc;
  }, {});

  const months = Object.keys(monthlyData).sort();
  const categories = [
    "Food",
    "Transport",
    "Entertainment",
    "Utilities",
    "Other",
  ];

  const chartData = {
    labels: months,
    datasets: categories.map((category) => ({
      label: category,
      data: months.map((month) => monthlyData[month][category] || 0),
      backgroundColor: getCategoryColor(category),
    })),
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Monthly Expenses by Category",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Amount ($)",
        },
      },
    },
  };

  return (
    <div className="chart-container">
      <Bar data={chartData} options={options} />
    </div>
  );
}

function getCategoryColor(category) {
  const colors = {
    Food: "rgba(255, 99, 132, 0.7)",
    Transport: "rgba(54, 162, 235, 0.7)",
    Entertainment: "rgba(255, 206, 86, 0.7)",
    Utilities: "rgba(75, 192, 192, 0.7)",
    Other: "rgba(153, 102, 255, 0.7)",
  };
  return colors[category] || "rgba(199, 199, 199, 0.7)";
}
