import Image from "next/image";

const NewsCardAll = () => {
  return (
    <>
      <div className="flex sm:flex-row flex-col-reverse justify-between gap-5 py-5">
        <div className="flex flex-col gap-3 sm:w-3/4 w-full">
          <div className="flex gap-5 items-center text-center">
            <p className="border border-emerald-800 p-1 px-2 rounded-md text-emerald-800 font-semibold sm:text-sm text-xs">
              Somewhat-Bullish
            </p>
            <p className="sm:text-sm text-xs">
              Author :{" "}
              <span className="text-emerald-800 font-semibold">Vandana</span>
            </p>
          </div>
          <div>
            <h1 className="font-semibold line-clamp-1 sm:text-xl text-base">
              TGS ASA to hold fixed income investor meetings
            </h1>
            <p className="text-xs sm:text-sm text-gray-500">
              On Monday, Cigna Group CI said its officials are expected to
              participate in meetings with investors and analysts over the next
              several weeks. Additionally, in light of recent and persistent
              speculation, Cigna confirmed that it is not pursuing a combination
              with Humana Inc. HUM.
            </p>
            <p className="text-xs sm:text-sm font-semibold text-emerald-800">
              LWAY, SPNS, XERS, SMR, GFI, TEM, BFLY{" "}
            </p>
          </div>
        </div>
        <div className="sm:w-1/4 w-full">
          <Image
            src="https://www.benzinga.com/next-assets/images/schema-image-default.png"
            alt=""
            width={50}
            height={50}
            className="w-full rounded object-cover aspect-video"
          />
        </div>
      </div>
      <div className="border-b p-1"></div>
    </>
  );
};
export default NewsCardAll;
