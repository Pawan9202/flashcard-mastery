import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useTheme } from './ThemeProvider';
import { PerformanceData } from '../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface StatsChartProps {
  performanceData: PerformanceData[];
}

const StatsChart = ({ performanceData }: StatsChartProps) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  // Get today's date
  const today = new Date();

  // Sort data by date
  const sortedData = [...performanceData].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  // Replace labels with today's date
  const labels = sortedData.map((_, index) => {
    const adjustedDate = new Date();
    adjustedDate.setDate(today.getDate() - index); // Offsets each entry slightly
    return adjustedDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  });

  const successRateData = sortedData.map(item => item.successRate);
  const cardsStudiedData = sortedData.map(item => item.cardsStudied);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Success Rate (%)',
        data: successRateData,
        borderColor: '#047857', // brand-green
        backgroundColor: 'rgba(4, 120, 87, 0.2)',
        tension: 0.3,
        yAxisID: 'y',
      },
      {
        label: 'Cards Studied',
        data: cardsStudiedData,
        borderColor: '#1E3A8A', // brand-blue
        backgroundColor: 'rgba(30, 58, 138, 0.2)',
        tension: 0.3,
        borderDash: [5, 5],
        yAxisID: 'y1',
      }
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    scales: {
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        min: 0,
        max: 100,
        grid: {
          color: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
        }
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        grid: {
          drawOnChartArea: false,
        },
        ticks: {
          color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
        }
      },
      x: {
        grid: {
          color: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
        }
      }
    },
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)',
        }
      },
      tooltip: {
        backgroundColor: isDark ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)',
        titleColor: isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)',
        bodyColor: isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)',
        borderColor: isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
        borderWidth: 1,
      }
    },
  };

  return (
    <div className="p-4 rounded-xl bg-card">
      <h3 className="text-lg font-medium mb-3">Learning Progress</h3>
      <Line options={options} data={chartData} />
    </div>
  );
};

export default StatsChart;
