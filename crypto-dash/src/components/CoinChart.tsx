import { useState, useEffect } from 'react'
import {
    Chart as ChartJs,
    CategoryScale,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    TimeScale,
    Tooltip
} from 'chart.js';
import { Line } from 'react-chartjs-2'

import type { ChartData } from 'chart.js';

ChartJs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    TimeScale
);

const API_URL = import.meta.env.VITE_COIN_API_URL;

interface CoinChartProps {
    id: string;
}

type ChartPoint = { x: number; y: number };

const CoinChart = ({ id }: CoinChartProps) => {
    const [chartData, setChartData] = useState<ChartData<'line', ChartPoint[]> | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPrices = async () => {
            try {
                const response = await fetch(`${API_URL}/${id}/market_chart?vs_currency=brl&days=7`);

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(`${response.status}, ${errorData.error}`);
                }

                const data = await response.json();
                
                const prices: ChartPoint[] = data.prices.map((price: [number, number]) => ({
                    x: price[0],
                    y: price[1]
                }));


                setChartData({
                    datasets: [
                        {
                            label: 'Price (BRL)',
                            data: prices,
                            fill: true,
                            borderColor: '#007bff',
                            backgroundColor: 'rgba(0, 123, 255, 0.1)',
                            pointRadius: 0,
                            tension: 0.3
                        }
                    ]
                });

            } catch (error: unknown) {
                if (error instanceof Error) {
                    setError(error.message);
                    console.error("Erro no CoinChart:", error.message);
                }
            } finally {
                setLoading(false);
            }
        }

        fetchPrices();

    }, [id]);

    if (loading) return <p>Loading chart...</p>
    
    if (error) return <p style={{ color: 'red' }}>{error}</p>

    if (!chartData) return <p>No data available.</p>

    return (
        <div style={{ marginTop: '30px' }}>
            <Line data={chartData} options={{
                responsive: true,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        mode: 'index', intersect: false
                    },
                },
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            unit: 'day'
                        }, ticks: {
                            autoSkip: true,
                            maxTicksLimit: 7
                        }
                    },
                    y: {
                        ticks: {
                            callback: (value) => `$${Number(value).toLocaleString()}`
                        }
                    }
                }
            }} />
        </div>
    )
}

export default CoinChart;