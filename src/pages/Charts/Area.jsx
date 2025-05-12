import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { areaChartData, areaCustomSeries } from '../../data/dummy'; // prilagodi putanju

const CustomAreaChart = () => {
  
  const mergedData = areaChartData[0].map((_, i) => {
    const row = { date: areaChartData[0][i].x.toISOString().split('T')[0] };
    areaCustomSeries.forEach((series, idx) => {
      row[series.name] = areaChartData[idx][i]?.y ?? null;
    });
    return row;
  });

  const fillColors = ['#8884d8', '#82ca9d', '#ffc658'];

  return (
    <div className="dark:bg-secondary-dark-bg dark:text-white m-2 md:m-10 p-4 md:p-10 bg-white rounded-3xl shadow-md">
      <h2 className="dark:text-white text-2xl font-bold mb-6 text-gray-700">Inflation Rates (Area)</h2>
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={mergedData}>
          <defs>
            {areaCustomSeries.map((series, idx) => (
              <linearGradient key={series.name} id={`color-${series.name}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={fillColors[idx % fillColors.length]} stopOpacity={0.8} />
                <stop offset="95%" stopColor={fillColors[idx % fillColors.length]} stopOpacity={0} />
              </linearGradient>
            ))}
          </defs>

          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tickFormatter={(tick) => new Date(tick).getFullYear()}
            tick={{ fontSize: 12, fill: '#555' }}
          />
          <YAxis
            tick={{ fontSize: 12, fill: '#555' }}
            domain={[0, 'auto']}
          />
          <Tooltip />
          <Legend wrapperStyle={{ fontSize: '14px' }} />

          {areaCustomSeries.map((series, idx) => (
            <Area
              key={series.name}
              type="monotone"
              dataKey={series.name}
              stroke={fillColors[idx % fillColors.length]}
              fillOpacity={1}
              fill={`url(#color-${series.name})`}
              strokeWidth={2}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomAreaChart;
