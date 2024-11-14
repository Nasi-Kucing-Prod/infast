import Error from "@/components/Error";
import NewsCardAll from "@/components/NewsCardAll";

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
  ticker_sentiment?: { ticker: string }[];
}

const Page = async () => {
  const res = await fetch("http://localhost:8000/news", { cache: "no-cache" });
  const data: NewsRes = (await res.json()) || [];
  console.log(data, "ini berhasil");

  if (!res.ok) {
    return <Error />;
  }

  return (
    <>
      <div className="flex flex-col font-poppins sm:gap-20 gap-10">
        {/* hero section */}
        <div className="flex flex-col h-screen text-start justify-center gap-5">
          <div className="flex flex-col gap-2">
            <h1 className="logo font-semibold uppercase sm:text-6xl text-4xl text-emerald-800">
              short-position
            </h1>
            <h2 className="logo font-semibold sm:text-3xl text-2xl text-emerald-800">
              &quot;a minor correction to $71.77 or higher&quot;
            </h2>
          </div>
          <p className="text-sm sm:text-lg text-gray-500">
            Bitcoin has entered full manipulation mode. The waves are
            accelerating, and as warned yesterday, the slow bleed has begun.
            There&apos;s a top red trendline that connect the wicks...
          </p>
        </div>

        <div className="flex flex-col gap-5 sm:gap-8">
          <div>
            <h1 className="font-semibold sm:text-2xl text-xl hover:text-emerald-800 cursor-pointer">
              Feeds
            </h1>
            <p className="text-gray-500 text-sm sm:text-lg">
              Latest trending news
            </p>
          </div>
          <div className="border rounded-md p-5 bg-white drop-shadow-md">
            {data && data.feed.length > 0 ? (
              data.feed.map((news, index) => (
                <NewsCardAll key={index} {...news} />
              ))
            ) : (
              <p className="text-gray-500">No news available at the moment.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default Page;
