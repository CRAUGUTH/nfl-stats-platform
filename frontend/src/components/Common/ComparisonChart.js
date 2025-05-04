// src/components/Common/ComparisonChart.js
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function ComparisonChart({ data1, data2, label1, label2, statKey }) {
  // sort both series by season ascending
  const sorted1 = [...data1].sort((a, b) => a.season - b.season);
  const sorted2 = [...data2].sort((a, b) => a.season - b.season);

  const labels = sorted1.map(r => String(r.season));
  const dataset1 = sorted1.map(r => r[statKey] ?? 0);
  const dataset2 = sorted2.map(r => r[statKey] ?? 0);

  const data = {
    labels,
    datasets: [
      {
        label: label1,
        data: dataset1,
        fill: false,
        tension: 0.3,
        borderColor: 'red',
        backgroundColor: 'rgba(255,0,0,0.2)'
      },
      {
        label: label2,
        data: dataset2,
        fill: false,
        tension: 0.3,
        borderColor: 'blue',
        backgroundColor: 'rgba(0,0,255,0.2)'
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: statKey.replace(/_/g, ' ').toUpperCase() }
    },
    scales: {
      x: { title: { display: true, text: 'Season' } },
      y: { title: { display: true, text: statKey.replace(/_/g, ' ').toUpperCase() } }
    }
  };

  return <Line data={data} options={options} />;
}
