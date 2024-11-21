import Error from "@/components/Error";
import NewsCardAll from "@/components/NewsCardAll";
import { Carousel } from "antd";
import Image from "next/image";
import Link from "next/link";

const Page = async () => {
  const res = await fetch(
    `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&apikey=${process.env.PRIVATE_KEY_ALPHA}`
    // { cache: "no-cache" }
  );
  const data: NewsRes = (await res.json()) || [];
  console.log(data, "ini berhasil");

  console.log(res.status, "wawwww");
  if (data.Information) {
    return <Error />;
  }

  if (!res.ok) {
    return <Error />;
  }

  return (
    <>
      <div className="flex flex-col font-poppins sm:gap-20 gap-10">
        {/* hero section */}
        <div className="mt-10">
          <Carousel autoplay>
            {data.feed.map(
              (news, index) =>
                news.banner_image && (
                  <div key={index} className="w-11/12 h-auto mx-auto relative">
                    <Link href={news.url}>
                      <Image
                        src={news.banner_image}
                        alt={news.title}
                        width={1000}
                        height={1000}
                        draggable="false"
                        className="w-full h-96 aspect-video object-cover"
                      />
                      <div className="absolute bottom-0 left-0 w-full bg-primary-infast bg-opacity-70 p-4 text-white text-xl font-bold">
                        {news.title}
                      </div>
                    </Link>
                  </div>
                )
            )}
          </Carousel>
        </div>

        <div className="flex flex-col gap-5 sm:gap-8">
          <div>
            <h1 className="font-semibold sm:text-2xl text-xl hover:text-primary-infast cursor-pointer">
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
              <Error />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default Page;
