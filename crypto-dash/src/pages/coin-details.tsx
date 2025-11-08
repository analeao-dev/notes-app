import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import Spinner from "../components/Spinner";
import CoinChart from "../components/CoinChart";

const API_URL = import.meta.env.VITE_COIN_API_URL;

interface CurrencyData {
    brl: number;
    usd: number;
    [key: string]: number;
}

interface ImageData {
    thumb: string;
    small: string;
    large: string;
}

interface CoinDetailsData {
    id: string;
    name: string;
    symbol: string;
    image: ImageData;
    description: {
        en: string;
    };
    market_cap_rank: number;
    last_updated: string;
    links: {
        homepage: string[];
    };
    market_data: {
        current_price: CurrencyData;
        market_cap: CurrencyData;
        high_24h: CurrencyData;
        low_24h: CurrencyData;
    };
}

const CoinDetails = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [coin, setCoin] = useState<CoinDetailsData | null>(null);


    useEffect(() => {
        const fetchCoin = async () => {
            try {
                const response = await fetch(`${API_URL}/${id}`);

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(`${response.status}, ${errorData.error}`);
                }

                const data: CoinDetailsData = await response.json();
                setCoin(data);
                console.log(data);

            } catch (error: unknown) {
                if (error instanceof Error) {
                    setError(error.message);
                }
            } finally {
                setLoading(false);
            }
        }

        fetchCoin();

    }, [id]);

    return (
        <div className="coin-details-container">
            <Link to="/">Back To Home</Link>
            {loading && <Spinner color="white" />}
            {error && <div className="error">{error}</div>}

            {!loading && !error && coin && (
                <>
                    <h1 className="coin-details-title">
                        {`${coin.name} (${coin.symbol.toUpperCase()})`}
                    </h1>
                    <img src={coin.image.large} alt={coin.name} className="coin-details-image" />
                    {/* Adicione um seletor opcional para o caso da descrição não existir */}
                    <p>{coin.description?.en.split('. ')[0] + '.'}</p>
                    <div className="coit-details-info">
                        <h3>Rank: #{coin.market_cap_rank}</h3>
                        <h3>Current Price: ${coin.market_data.current_price.brl.toLocaleString()}</h3>
                        <h4>Market Cap: ${coin.market_data.market_cap.usd.toLocaleString()}</h4>
                        <h4>24 High: ${coin.market_data.high_24h.brl.toLocaleString()}</h4>
                        <h4>24 Low: ${coin.market_data.low_24h.brl.toLocaleString()}</h4>
                        <h4>Last Updated: {new Date(coin.last_updated).toLocaleDateString()}</h4>
                    </div>

                    <CoinChart id={coin.id}/>

                    <div className="coin-details-links">
                        {coin.links.homepage[0] && (
                            <p>
                                🌏
                                <a href={coin.links.homepage[0]} target="_blank" rel="noopener noreferrer">
                                    Website
                                </a>
                            </p>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

export default CoinDetails;