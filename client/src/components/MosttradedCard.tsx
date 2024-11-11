import Image from "next/image";

const MosttradedCard = () => {
  return (
    <>
      <div className="flex flex-col border rounded-md h-full w-full p-5 gap-5 drop-shadow-md bg-white">
        <div className="flex flex-col">
          <h1 className="font-semibold sm:text-2xl text-xl">Most Traded</h1>
          <p className="text-gray-500 text-sm sm:text-base">
            See what market is trending
          </p>
        </div>
        <div className="flex justify-between">
          <div className="flex gap-2 text-center items-center">
            <Image
              src="https://cryptologos.cc/logos/gitcoin-gtc-logo.png"
              alt=""
              width={50}
              height={50}
            />
            <div className="text-start">
              <p className="text-gray-500 sm:text-sm text-xs">name</p>
              <p className="font-semibold sm:text-lg text-base">symbol</p>
            </div>
          </div>
          <div className="flex gap-2 items-center text-center">
            {/* price */}
            <p className="font-semibold sm:text-2xl text-xl">$57.490</p>
            {/* change_percentage */}
            <p className="border border-emerald-800 p-1 text-emerald-800 rounded-md sm:text-sm text-xs">
              +51.00%
            </p>
          </div>
        </div>
        <div className="border-b p-1"></div>
      </div>
    </>
  );
};
export default MosttradedCard;
