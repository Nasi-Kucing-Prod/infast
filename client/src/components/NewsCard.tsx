import Image from "next/image";
import Link from "next/link";

interface NewsCardProp {
  title: string;
  url: string;
  summary: string;
  overall_sentiment_label: string;
  banner_image: string;
}

const NewsCard: React.FC<NewsCardProp> = ({
  title,
  url,
  summary,
  overall_sentiment_label,
  banner_image,
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
      <div className="border rounded-md p-5 flex flex-col w-full gap-3 bg-white drop-shadow-md h-80">
        <div className="w-full">
          {banner_image ? (
            <Image
              src={banner_image}
              alt={title}
              width={1000}
              height={1000}
              className="w-full rounded object-cover aspect-video"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 rounded aspect-video" />
          )}
        </div>
        <div className="flex flex-col gap-2">
          {/* title */}
          <Link
            href={url}
            target="_blank"
            rel=""
            className="font-semibold line-clamp-1"
          >
            <h2 className="hover:underline">{title}</h2>
          </Link>
          {/* summary */}
          <p className="line-clamp-3 text-gray-500 sm:text-sm text-xs">
            {summary}
          </p>
          {/* overall_sentiment_label */}
          <p
            className={`border ${borderColor} p-1 px-2 rounded-md ${sentimentClass} font-semibold sm:text-sm text-xs w-fit`}
          >
            {overall_sentiment_label}
          </p>
        </div>
      </div>
    </>
  );
};
export default NewsCard;
