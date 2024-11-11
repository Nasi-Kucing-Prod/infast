import Image from "next/image";
import Link from "next/link";

const NewsCard = () => {
  return (
    <>
      <div className="border rounded-md p-5 flex flex-col w-full gap-3 bg-white drop-shadow-md">
        <div className="w-full">
          <Image
            src="https://cryptologos.cc/logos/gitcoin-gtc-logo.png"
            alt=""
            width={50}
            height={50}
            className="w-full rounded object-cover aspect-video"
          />
        </div>
        <div className="flex flex-col gap-2">
          {/* title */}
          <Link
            href=""
            target="_blank"
            rel=""
            className="font-semibold line-clamp-1"
          >
            <h2 className="hover:underline">
              Trump Reportedly Urges Russian President To Deescalate War With
              Ukraine: Here's How Crude Oil WTI Futures Are Reacting
            </h2>
          </Link>
          {/* summary */}
          <p className="line-clamp-3 text-gray-500 sm:text-sm text-xs">
            Crude oil WTI futures saw a slight uptick following a significant
            phone call between President-elect Donald Trump and Russian
            President Vladimir Putin. What Happened: At the time of writing,
            Crude Oil WTI Futures was up 0.18% at $70.25 per barrel on Monday
            during pre-market hours.
          </p>
          {/* overall_sentiment_label */}
          <p className="border border-emerald-800 p-1 text-emerald-800 rounded-md sm:text-sm text-xs w-fit">
            Somewhat-Bearish
          </p>
        </div>
      </div>
    </>
  );
};
export default NewsCard;
