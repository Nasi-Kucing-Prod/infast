interface MarketData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: string;
  market_cap_rank: number;
  market_cap_change_percentage_24h: number;
  currency: string;
}

interface NewsRes {
  feed: NewsItem[];
}

interface NewsItem {
  title: string;
  url: string;
  authors: string[];
  summary: string;
  overall_sentiment_label: string;
  banner_image: string;
  ticker_sentiment?: { ticker: string; ticker_sentiment_label: string }[];
}

interface Ticker {
  ticker: string;
  name: string;
  market: string;
  locale: string;
  active: boolean;
  currency_symbol: string;
  currency_name: string;
  base_currency_symbol: string;
  base_currency_name: string;
  last_updated_utc: string;
}

interface ApiResponse {
  results: Ticker[];
  next_url?: string;
}

interface SearchResponse {
  results: SearchResponseItem[];
}

interface TickerDashboard {
  currency_symbol: string;
  name: string;
  latest_price: number;
  market: string;
  change_percentage: number;
}

interface TickerDashboard {
  currency_symbol: string;
  name: string;
  latest_price: number;
  change_percentage: number;
}

interface TableRowDashboardProps {
  index: number;
  ticker: TickerDashboard;
}

interface TableDashboardProps {
  market: "crypto" | "forex" | "stocks";
}
interface ChartDashboardProps {
  market: "crypto" | "stocks" | "fx";
}
