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
  return (
    <>
      <div className="border rounded-md p-5 flex flex-col w-full gap-3 bg-white drop-shadow-md">
        <div className="w-full">
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
          <p className="border border-emerald-800 p-1 text-emerald-800 rounded-md sm:text-sm text-xs w-fit">
            {overall_sentiment_label}
          </p>
        </div>
      </div>
    </>
  );
};
export default NewsCard;
