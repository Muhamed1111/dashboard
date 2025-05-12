import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

import {
  lineChartData,
  lineCustomSeries,
} from '../../data/dummy';

const LineChartWithInput = () => {
  const [userInput, setUserInput] = useState({
    series: 'Germany',
    year: 2012,
    value: 50,
  });

  const [, forceUpdate] = useState(0);

  const mergedData = lineChartData[0].map((_, i) => {
    const row = { date: lineChartData[0][i].x.toISOString() };
    lineCustomSeries.forEach((series, idx) => {
      row[series.name] = lineChartData[idx][i].y;
    });
    return row;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const seriesIndex = lineCustomSeries.findIndex(
      (s) => s.name === userInput.series
    );

    if (seriesIndex !== -1) {
      lineChartData[seriesIndex].push({
        x: new Date(userInput.year, 0, 1),
        y: Number(userInput.value),
      });

      lineChartData[seriesIndex].sort((a, b) => a.x - b.x);
      forceUpdate((n) => n + 1);
    }
  };

  const strokeColors = ['#3366cc', '#dc3912', '#ff9900'];

  return (
    <div className="dark:bg-secondary-dark-bg dark:text-white m-2 md:m-10 p-4 md:p-10 bg-white rounded-3xl shadow-md">
      <h2 className="dark:text-white text-2xl font-bold mb-6 text-gray-700">Inflation Rate</h2>

      {/* Forma */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-wrap gap-4 items-center mb-8"
      >
        <select
          value={userInput.series}
          onChange={(e) =>
            setUserInput({ ...userInput, series: e.target.value })
          }
          className="border border-gray-300 rounded px-3 py-2"
        >
          {lineCustomSeries.map((s) => (
            <option key={s.name} value={s.name}>
              {s.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          value={userInput.year}
          onChange={(e) =>
            setUserInput({ ...userInput, year: e.target.value })
          }
          className="border border-gray-300 rounded px-3 py-2"
          placeholder="Year"
        />

        <input
          type="number"
          value={userInput.value}
          onChange={(e) =>
            setUserInput({ ...userInput, value: e.target.value })
          }
          className="border border-gray-300 rounded px-3 py-2"
          placeholder="Value"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
        >
          Add
        </button>
      </form>

      {/* Graf */}
      <ResponsiveContainer width="100%" height={450}>
        <LineChart
          data={mergedData}
          margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis
            dataKey="date"
            tickFormatter={(tick) => new Date(tick).getFullYear()}
            tick={{ fill: '#555', fontSize: 12 }}
          />
          <YAxis
            domain={[0, 100]}
            tickFormatter={(v) => `${v}%`}
            tick={{ fill: '#555', fontSize: 12 }}
            width={50}
          />
          <Tooltip
            formatter={(value) => `${value}%`}
            labelFormatter={(label) => `Year: ${new Date(label).getFullYear()}`}
            contentStyle={{ backgroundColor: '#f9f9f9', borderColor: '#ccc' }}
          />
          <Legend wrapperStyle={{ fontSize: '14px' }} />

          {lineCustomSeries.map((series, idx) => (
            <Line
              key={series.name}
              type="monotone"
              dataKey={series.name}
              stroke={strokeColors[idx % strokeColors.length]}
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 7 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartWithInput;
