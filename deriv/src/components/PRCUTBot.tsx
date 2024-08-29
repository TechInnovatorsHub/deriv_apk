// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

interface Signal {
  position: number;
  r: number;
  g: number;
  b: number;
  trailingStop: number | undefined;
}

const PRCUTBot: React.FC = () => {
  const [signals, setSignals] = useState<Signal[]>([]);
  const a = 1; // Key Value
  const c = 10; // ATR period
  const heikin = true; // Heikin-Ashi

  // Mock data: Replace with real market data
  const closePrices = [1.2, 1.3, 1.1, 1.25, 1.27, 1.29, 1.35, 1.33, 1.28, 1.32];
  const openPrices = [1.15, 1.28, 1.2, 1.24, 1.26, 1.28, 1.33, 1.31, 1.25, 1.29];
  const highPrices = [1.22, 1.35, 1.25, 1.3, 1.31, 1.33, 1.37, 1.34, 1.3, 1.33];
  const lowPrices = [1.1, 1.25, 1.1, 1.23, 1.24, 1.27, 1.32, 1.3, 1.22, 1.28];

  useEffect(() => {
    
    // Removed the declaration of xatr variable since it is not being used
    // const nLoss: number[] = []; // Array to store nLoss values
    const trailingStops: (number | undefined)[] = []; // Array to store trailing stops

    let position = 0;
    let r = 0;
    let g = 0;
    let b = 0;

    for (let i = 0; i < closePrices.length; i++) {
      const src = heikin
        ? (openPrices[i] + closePrices[i] + highPrices[i] + lowPrices[i]) / 4
        : closePrices[i];

      if (i < c) {
        trailingStops.push(undefined);
      } else {
        const prevSrc = i > 0 ? closePrices[i - 1] : closePrices[i];
        const prevTrailingStop = trailingStops[i - 1];

        // Simplified ATR calculation for demonstration
        const xatrValue = 0.1; // Replace with actual ATR calculation logic
        const nLossValue = a * xatrValue;

        const xatrTrailingStop = calculateXatrTrailingStop(
          src,
          prevSrc,
          prevTrailingStop,
          nLossValue
        );

        trailingStops.push(xatrTrailingStop);

        if (prevSrc < prevTrailingStop! && src > xatrTrailingStop) {
          position = 1;
          r = 250;
          g = 0;
          b = 0;
        } else if (prevSrc > prevTrailingStop! && src < xatrTrailingStop) {
          position = -1;
          r = 0;
          g = 0;
          b = 250;
        } else {
          // eslint-disable-next-line no-self-assign
          position = position;
        }

        setSignals((prevSignals) => [
          ...prevSignals,
          { position, r, g, b, trailingStop: xatrTrailingStop },
        ]);
      }
    }
  }, [closePrices, openPrices, highPrices, lowPrices, a, c, heikin]);

  const chartData = {
    labels: closePrices.map((_, index) => `Bar ${index + 1}`),
    datasets: [
      {
        label: 'Close Prices',
        data: closePrices,
        borderColor: 'blue',
        fill: false,
      },
      {
        label: 'Trailing Stop',
        data: signals.map((signal) => signal.trailingStop),
        borderColor: 'red',
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
    scales: {
      x: {
        display: true,
      },
      y: {
        display: true,
      },
    },
  };

  return (
    <div>
      <h1>PRC_UT Bot Alerts</h1>
      <Line data={chartData} options={options} />
    </div>
  );
};

const calculateXatrTrailingStop = (
  src: number,
  prevSrc: number,
  xatrTrailingStop: number | undefined,
  nLoss: number
): number => {
  if (prevSrc > xatrTrailingStop! && src > xatrTrailingStop!) {
    return Math.max(xatrTrailingStop!, src - nLoss);
  } else if (prevSrc < xatrTrailingStop! && src < xatrTrailingStop!) {
    return Math.min(xatrTrailingStop!, src + nLoss);
  } else if (src > xatrTrailingStop!) {
    return src - nLoss;
  } else {
    return src + nLoss;
  }
};

export default PRCUTBot;
