const Loading = () => {
  return (
    <div className="px-16 max-[1017px]:px-5 min-h-screen">
      <div className="flex flex-col h-[500px] text-start justify-center gap-5 animate-pulse bg-gray-100 mt-5 px-10">
        <div className="space-y-3">
          <div className="flex flex-col gap-2">
            <div className="bg-gray-200 h-10 sm:h-16 w-1/2 rounded"></div>
            <div className="bg-gray-200 h-6 sm:h-8 w-3/4 rounded"></div>
          </div>
          <div className="space-y-1">
            <div className="bg-gray-200 h-4 sm:h-5 w-full rounded"></div>
            <div className="bg-gray-200 h-4 sm:h-5 w-11/12 rounded"></div>
            <div className="bg-gray-200 h-4 sm:h-5 w-10/12 rounded"></div>
            <div className="bg-gray-200 h-4 sm:h-5 w-9/12 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Loading;
