import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';
import { Radar, Bar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const ResultChart = ({ result }) => {
  const data = {
    labels: ['Aptitude', 'Personality', 'Interest'],
    datasets: [
      {
        label: 'Score Profile',
        data: [result.aptitudeScore, result.personalityScore, result.interestScore],
        backgroundColor: 'rgba(99, 102, 241, 0.3)',
        borderColor: 'rgba(99, 102, 241, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(99, 102, 241, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(99, 102, 241, 1)',
      },
    ],
  };

  const options = {
    scales: {
      r: {
        angleLines: { display: true, color: 'rgba(255, 255, 255, 0.1)' },
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
        pointLabels: { color: 'rgba(255, 255, 255, 0.8)', font: { size: 12, weight: 'bold' } },
        ticks: { backdropColor: 'transparent', color: 'rgba(255, 255, 255, 0.5)' },
        suggestedMin: 0,
        suggestedMax: 50,
      }
    },
    plugins: {
      legend: { position: 'bottom', labels: { color: '#fff' } }
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-[#0f1015] p-6 rounded-3xl shadow-xl border border-gray-800 relative z-10">
      <h3 className="text-center font-bold text-white mb-4 tracking-wide">Skills Assessment Data</h3>
      <Radar data={data} options={options} />
    </div>
  );
};

export default ResultChart;
