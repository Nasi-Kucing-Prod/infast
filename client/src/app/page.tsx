"use client";
import { useState, useEffect } from "react"; // Import useEffect
import Footer from "@/components/Footer";
import GainersCard from "@/components/GainersCard";
import MosttradedCard from "@/components/MosttradedCard";
import Navbar from "@/components/Navbar";
import NewsCard from "@/components/NewsCard";
import Link from "next/link";
import { useAuth } from "./signup/context/AuthContext";
import Image from "next/image";
import infast from "@/image/infast.png";
import Error from "@/components/Error";

interface NewsRes {
  feed: NewsItem[];
  Information: string;
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

export default function Home() {
  const { token } = useAuth();
  const [newsData, setNewsData] = useState<NewsRes | null>(null);
  const [assetData, setAssetData] = useState<AssetData | null>(null);

  console.log(newsData, "iniii");

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        // `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&apikey=${process.env.PRIVATE_KEY_ALPHA}`,
        "http://localhost:8000/news",
        {
          // cache: "no-cache",
        }
      );
      const data: NewsRes = await res.json();
      setNewsData(data);

      if (data.Information) {
        return <Error />;
      }

      if (!res.ok) {
        return <Error />;
      }

      const assetRes = await fetch(
        // `https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=${process.env.PRIVATE_KEY_ALPHA}`,
        "http://localhost:8000/assets",
        {
          // cache: "no-cache",
        }
      );
      const assetData: AssetData = await assetRes.json();
      setAssetData(assetData);
    };

    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="px-16 max-[1017px]:px-5 overflow-hidden">
        <div className="flex flex-col font-poppins sm:gap-20 gap-10">
          {/* Main Content */}
          <div className="flex justify-between items-center xs:text-start text-center gap-2 min-h-screen">
            <div className="absolute blur-xl  w-80 h-80 bg-green-300/50 rounded-full mix-blend-multiply filter opacity-70 "></div>
            <div className="xs:w-1/2 w-full xs:items-start items-center gap-10 flex flex-col z-10">
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <h1 className="logo font-semibold text-6xl max-[1017px]:text-4xl text-primary-infast text-wrap">
                    Self-serve & Transparent
                  </h1>
                  <h2 className="logo font-semibold text-3xl max-[1017px]:text-2xl text-primary-infast">
                    a new way for investing together
                  </h2>
                </div>
                <p className="max-[1017px]:text-sm text-lg text-black-infast font-normal">
                  Infast being a self-serve with our services and one of, if not
                  the most important thing being transparent with our stock
                  market data makes us your best choice for the job!
                </p>
              </div>
              {/* Buttons */}
              <div className=" flex gap-5 font-semibold tracking-wider text-center items-center">
                {token ? (
                  <Link
                    href={"/dashboard"}
                    className="text-white bg-primary-infast p-3 max-[1017px]:p-2 rounded-md hover:bg-secondary-infast sm:text-base text-sm"
                  >
                    Dashboard
                  </Link>
                ) : (
                  <Link
                    href={"/login"}
                    className="text-white bg-primary-infast p-3 max-[1017px]:p-2 rounded-md hover:bg-secondary-infast sm:text-base text-sm"
                  >
                    Get Started
                  </Link>
                )}

                <Link
                  href={"/AboutUs"}
                  className="text-primary-infast border border-primary-infast p-3 max-[1017px]:p-2 rounded-md sm:text-base text-sm"
                >
                  About Us
                </Link>
              </div>
            </div>
            <div className="relative -mx-16 -right-40">
              <Image
                src={infast}
                alt="infast"
                width={610}
                height={610}
                className="w-full h-auto xs:block hidden"
              />
            </div>
          </div>
          {/* branding section */}
          <div className="text-center items-center flex flex-col sm:gap-10 gap-5">
            <div>
              <p className="text-sm sm:text-lg text-gray-500">
                Your trust is very important to us
              </p>
              <h1 className="logo font-semibold sm:text-6xl text-3xl text-primary-infast">
                #InfastWeTrade
              </h1>
            </div>
            <div className="flex flex-wrap gap-10 items-center text-center justify-center">
              <div className="flex-col">
                <h1 className="font-semibold sm:text-5xl text-3xl text-primary-infast">
                  #1
                </h1>
                <p className="text-sm sm:text-lg text-gray-500">
                  Top website in the world
                </p>
              </div>
              <div className="flex-col">
                <h1 className="font-semibold sm:text-5xl text-3xl text-primary-infast">
                  93M+
                </h1>
                <p className="text-sm sm:text-lg text-gray-500">
                  Traders use our platform
                </p>
              </div>
              <div className="flex-col">
                <h1 className="font-semibold sm:text-5xl text-3xl text-primary-infast">
                  2.5M+
                </h1>
                <p className="text-sm sm:text-lg text-gray-500">
                  Reviews with 4.9 average ratings
                </p>
              </div>
              <div className="flex-col">
                <h1 className="font-semibold sm:text-5xl text-3xl text-primary-infast">
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
              <GainersCard gainers={assetData?.top_gainers || []} />
            </div>
            <div className="md:w-1/2 w-full">
              <MosttradedCard traded={assetData?.most_actively_traded || []} />
            </div>
          </div>

          {/* news section */}
          <div className="flex flex-col gap-5">
            <div className="">
              <Link href="/news">
                <h1 className="font-semibold sm:text-2xl text-xl hover:text-primary-infast cursor-pointer">
                  News Flash &gt;
                </h1>
              </Link>
              <p className="text-gray-500 text-sm sm:text-lg">
                See what&apos;s on trending news
              </p>
            </div>
            <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 max-[500px]:grid-cols-1 justify-start gap-10 place-items-center">
              {newsData && newsData?.feed?.length > 0 ? (
                newsData.feed
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
      {/* </div> */}
      <Footer />
    </>
  );
}
