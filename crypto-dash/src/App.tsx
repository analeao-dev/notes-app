import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router';
import HomePage from './pages/home';
import AboutPage from './pages/about';
import Header from './components/Header';
import NotFoundPage from './pages/not-found';

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

	return (
		<>
			<Header />
			<Routes>
				<Route path='/' element={
					<HomePage
						coins={coins}
						loading={loading}
						error={error}
						filter={filter}
						setFilter={setFilter}
						limit={limit}
						setLimit={setLimit}
						sortBy={sortBy}
						setSortBy={setSortBy}
					/>}
				/>
				<Route path='/about' element={<AboutPage />} />
				<Route path='*' element={<NotFoundPage />} />
			</Routes>
		</>

	);
};

export default App;
