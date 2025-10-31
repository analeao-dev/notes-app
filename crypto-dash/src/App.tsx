import { useEffect, useState } from 'react';
import CoinCard from './components/CoinCard';
import LimitSelector from './components/LimitSelector';
import FilterInput from './components/FilterInput';
import SortSelector from './components/SortSelect';

const API_URL = import.meta.env.VITE_API_URL;

interface Coin {
	id: string;
	name: string;
	image: string;
	symbol: string;
	current_price: number;
	price_change_percentage_24h: number;
	market_cap: number;
}

const App = () => {
	const [coins, setCoins] = useState<Coin[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string>('');
	const [limit, setLimit] = useState<number>(5);
	const [filter, setFilter] = useState<string>('');
	const [sortBy, setSortBy] = useState<string>('market_cap_desc');

	useEffect(() => {
		const FetchCoins = async () => {
			try {
				const response = await fetch(
					`${API_URL}&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`
				);
				if (!response.ok) {
					const errorData = await response.json();
					throw new Error(`${response.status}, ${errorData.error}`);
				}

				const data: Coin[] = await response.json();
				setCoins(data);
			} catch (error: unknown) {
				if (error instanceof Error) {
					setError(error.message);
				}
			} finally {
				setLoading(false);
			}
		};

		FetchCoins();
	}, [limit, sortBy]);

	const filterdCoins = coins
		.filter((coin) => {
			return (
				coin.name.toLowerCase().includes(filter.toLowerCase()) ||
				coin.symbol.toLowerCase().includes(filter.toLowerCase())
			);
		})
		.slice()
		.sort((a: Coin, b: Coin): number => {
			switch (sortBy) {
				case 'market_cap_desc':
					return b.market_cap - a.market_cap;
				case 'market_cap_asc':
					return a.market_cap - b.market_cap;
				case 'price_desc':
					return b.current_price - a.current_price;
				case 'price_asc':
					return a.current_price - b.current_price;
				case 'change_desc':
					return b.price_change_percentage_24h - a.price_change_percentage_24h;
				case 'change_asc':
					return a.price_change_percentage_24h - b.price_change_percentage_24h;
				default:
					return 0;
			}
		});

	return (
		<div>
			<h1>🚀 Crypto Dash</h1>
			{loading && <p>Loading...</p>}
			{error && <div className='error'>{error}</div>}

			<div className='top-controls'>
				<FilterInput filter={filter} onFilterChange={setFilter} />
				<LimitSelector limit={limit} onLimitChange={setLimit} />
				<SortSelector sortBy={sortBy} onSortChange={setSortBy} />
			</div>

			{!loading && !error && (
				<main className='grid'>
					{filterdCoins.length > 0 ? (
						filterdCoins.map((coin) => <CoinCard key={coin.id} coin={coin} />)
					) : (
						<p>No matching coins</p>
					)}
				</main>
			)}
		</div>
	);
};

export default App;
