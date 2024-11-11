import GainersCard from "@/components/GainersCard";
import MosttradedCard from "@/components/MosttradedCard";
import NewsCard from "@/components/NewsCard";
import Link from "next/link";

export default function Home() {
  return (
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
            voluptatem. Sed iusto odit ipsum aut, illo quasi dolore, inventore
            aliquam, debitis atque deleniti.
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
          <GainersCard />
        </div>
        <div className="md:w-1/2 w-full">
          <MosttradedCard />
        </div>
      </div>

      {/* news section */}

      <div className="flex flex-col gap-5">
        <div className="">
          <h1 className="font-semibold sm:text-2xl text-xl hover:text-emerald-800 cursor-pointer">
            News Flash &gt;
          </h1>
          <p className="text-gray-500 text-sm sm:text-lg">
            See what&apos;s on tranding news
          </p>
        </div>
        <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 max-[500px]:grid-cols-1 justify-start gap-10 place-items-center">
          <NewsCard />
          <NewsCard />
          <NewsCard />
          <NewsCard />
        </div>
      </div>
    </div>
  );
}
