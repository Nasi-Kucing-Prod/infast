import Footer from "@/components/Footer";
import GainersCard from "@/components/GainersCard";
import MosttradedCard from "@/components/MosttradedCard";
import Navbar from "@/components/Navbar";
import NewsCard from "@/components/NewsCard";
import Link from "next/link";

interface NewsRes {
  feed: NewsItem[];
}
interface NewsItem {
  title: string;
  url: string;
  summary: string;
  overall_sentiment_label: string;
  banner_image: string;
}

interface AssetData {
  top_gainers: Array<{
    ticker: string;
    price: string;
    change_amount: string;
    change_percentage: string;
    volume: string;
  }>;
  most_actively_traded: Array<{
    ticker: string;
    price: string;
    change_amount: string;
    change_percentage: string;
    volume: string;
  }>;
}

export default async function Home() {
  const res = await fetch("http://localhost:8000/news", { cache: "no-cache" });
  const data: NewsRes = (await res.json()) || [];

  const assetRes = await fetch("http://localhost:8000/assets", {
    cache: "no-cache",
  });
  const assetData: AssetData = (await assetRes.json()) || {};

  return (
    <>
      <Navbar />
      <div className="px-16 max-[1017px]:px-5">
        <div className="flex flex-col font-poppins sm:gap-20 gap-10">
          {/* hero section */}
          <div className="flex flex-col items-center h-screen justify-center gap-10 text-center">
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <h1 className="logo font-semibold sm:text-6xl text-4xl text-emerald-800">
                  Self-serve & Tranparant
                </h1>
                <h2 className="logo font-semibold sm:text-3xl text-2xl text-emerald-800">
                  a new way for investing together
                </h2>
              </div>
              <p className="text-sm sm:text-lg text-gray-500">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui
                corporis sapiente doloribus possimus! Vitae saepe aliquam
                voluptatem. Sed iusto odit ipsum aut, illo quasi dolore,
                inventore aliquam, debitis atque deleniti.
              </p>
            </div>
            <div className="flex gap-5 font-semibold tracking-wider text-center items-center">
              <Link
                href={"/login"}
                className="text-white bg-emerald-800 sm:p-3 p-2 rounded-md hover:opacity-90 sm:text-base text-sm"
              >
                Get Started
              </Link>
              <Link
                href={"/about-us"}
                className="text-emerald-800 border border-emerald-800 sm:p-3 p-2 rounded-md sm:text-base text-sm"
              >
                About Us
              </Link>
            </div>
          </div>

          {/* branding section */}
          <div className="text-center items-center flex flex-col sm:gap-10 gap-5">
            <div>
              <p className="text-sm sm:text-lg text-gray-500">
                Your trust is very important to us
              </p>
              <h1 className="logo font-semibold sm:text-6xl text-3xl text-emerald-800">
                #InfastWeTrade
              </h1>
            </div>
            <div className="flex flex-wrap gap-10 items-center text-center justify-center">
              <div className="flex-col">
                <h1 className="font-semibold sm:text-5xl text-3xl text-emerald-800">
                  #1
                </h1>
                <p className="text-sm sm:text-lg text-gray-500">
                  Top website in the world
                </p>
              </div>
              <div className="flex-col">
                <h1 className="font-semibold sm:text-5xl text-3xl text-emerald-800">
                  93M+
                </h1>
                <p className="text-sm sm:text-lg text-gray-500">
                  Traders use our platform
                </p>
              </div>
              <div className="flex-col">
                <h1 className="font-semibold sm:text-5xl text-3xl text-emerald-800">
                  2.5M+
                </h1>
                <p className="text-sm sm:text-lg text-gray-500">
                  Reviews with 4.9 average ratings
                </p>
              </div>
              <div className="flex-col">
                <h1 className="font-semibold sm:text-5xl text-3xl text-emerald-800">
                  15M+
                </h1>
                <p className="text-sm sm:text-lg text-gray-500">
                  Custom ideas shared by our users
                </p>
              </div>
            </div>
          </div>

          {/* assets sec */}
          <div className="flex flex-col md:flex-row gap-5 w-full">
            <div className="md:w-1/2 w-full">
              <GainersCard gainers={assetData.top_gainers} />
            </div>
            <div className="md:w-1/2 w-full">
              <MosttradedCard traded={assetData.most_actively_traded} />
            </div>
          </div>

          {/* news section */}

          <div className="flex flex-col gap-5">
            <div className="">
              <Link href="/news">
                <h1 className="font-semibold sm:text-2xl text-xl hover:text-emerald-800 cursor-pointer">
                  News Flash &gt;
                </h1>
              </Link>
              <p className="text-gray-500 text-sm sm:text-lg">
                See what&apos;s on tranding news
              </p>
            </div>
            <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 max-[500px]:grid-cols-1 justify-start gap-10 place-items-center">
              {data && data.feed.length > 0 ? (
                data.feed
                  .slice(0, 8)
                  .map((news, index) => <NewsCard key={index} {...news} />)
              ) : (
                <p className="text-gray-500">
                  No news available at the moment.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
