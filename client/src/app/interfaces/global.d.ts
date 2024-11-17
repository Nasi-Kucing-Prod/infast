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
