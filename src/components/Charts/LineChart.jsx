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

      // sortiraj po datumu (x)
      lineChartData[seriesIndex].sort((a, b) => a.x - b.x);

      // rerender
      forceUpdate((n) => n + 1);
    }
  };

  const strokeColors = ['#8884d8', '#82ca9d', '#ff7300'];

  return (
    <div className="dark:bg-secondary-dark-bg dark:text-white m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
      <h2 className="text-xl font-bold mb-6">Inflation Rate</h2>

      {/* Forma za unos */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-wrap gap-4 items-center mb-6"
      >
        <select
          value={userInput.series}
          onChange={(e) =>
            setUserInput({ ...userInput, series: e.target.value })
          }
          className="border p-2 rounded dark:bg-secondary-dark-bg dark:text-white"
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
          className="border p-2 rounded dark:bg-secondary-dark-bg dark:text-white"
          placeholder="Year"
        />

        <input
          type="number"
          value={userInput.value}
          onChange={(e) =>
            setUserInput({ ...userInput, value: e.target.value })
          }
          className="border p-2 rounded"
          placeholder="Value"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add
        </button>
      </form>

      {/* Graf */}
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={mergedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tickFormatter={(tick) => new Date(tick).getFullYear()}
          />
          <YAxis
            domain={[0, 100]}
            tickFormatter={(value) => `${value}%`}
            interval={20}
          />
          <Tooltip formatter={(value) => `${value}%`} />
          <Legend />

          {lineCustomSeries.map((series, idx) => (
            <Line
              key={series.name}
              type="monotone"
              dataKey={series.name}
              stroke={strokeColors[idx % strokeColors.length]}
              strokeWidth={2}
              dot={{ r: 5 }}
              activeDot={{ r: 7 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartWithInput;
