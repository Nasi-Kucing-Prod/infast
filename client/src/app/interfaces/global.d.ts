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
