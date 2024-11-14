import Image from "next/image";
import Link from "next/link";

interface NewsCardAllProp {
  title: string;
  url: string;
  authors: string[];
  summary: string;
  overall_sentiment_label: string;
  banner_image: string;
  ticker_sentiment?: { ticker: string }[];
}

const NewsCardAll: React.FC<NewsCardAllProp> = ({
  title,
  url,
  authors,
  summary,
  overall_sentiment_label,
  banner_image,
  ticker_sentiment,
}) => {
  let sentimentClass = "";
  let borderColor = "";

  switch (overall_sentiment_label.toLowerCase()) {
    case "neutral":
      sentimentClass = "text-gray-600";
      borderColor = "border-gray-600";
      break;
    case "bearish":
      sentimentClass = "text-red-800";
      borderColor = "border-red-800";
      break;
    case "somewhat-bearish":
      sentimentClass = "text-red-500";
      borderColor = "border-red-500";
      break;
    case "somewhat-bullish":
      sentimentClass = "text-green-500";
      borderColor = "border-green-500";
      break;
    case "bullish":
      sentimentClass = "text-green-800";
      borderColor = "border-green-800";
      break;
    default:
      sentimentClass = "text-gray-500";
      borderColor = "border-gray-500";
  }
  return (
    <>
      <div className="flex sm:flex-row flex-col-reverse justify-between gap-5 py-5">
        <div className="flex flex-col gap-3 sm:w-3/4 w-full">
          <div className="flex gap-5 items-center text-center">
            <p
              className={`border ${borderColor} p-1 px-2 rounded-md ${sentimentClass} font-semibold sm:text-sm text-xs`}
            >
              {overall_sentiment_label}
            </p>
            <p className="sm:text-sm text-xs">
              Author :{" "}
              <span className="text-emerald-800 font-semibold">
                {authors.join(", ")}
              </span>
            </p>
          </div>
          <div>
            <Link
              href={url}
              target="_blank"
              rel=""
              className="font-semibold line-clamp-1"
            >
              <h2 className="hover:underline">{title}</h2>
            </Link>
            <p className="text-xs sm:text-sm text-gray-500">{summary}</p>
            <div className="text-xs sm:text-sm font-semibold text-emerald-800">
              {ticker_sentiment?.map((item, index) => (
                <span key={index}>
                  {item.ticker}
                  {index < ticker_sentiment.length - 1 ? ", " : ""}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="sm:w-1/4 w-full">
          {banner_image ? (
            <Image
              src={banner_image}
              alt={title}
              width={50}
              height={50}
              className="w-full rounded object-cover aspect-video"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 rounded aspect-video" />
          )}
        </div>
      </div>
      <div className="border-b p-1"></div>
    </>
  );
};
export default NewsCardAll;
