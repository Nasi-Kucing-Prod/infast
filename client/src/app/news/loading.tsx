const Loading = () => {
  return (
    <>
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
      {[...Array(4)].map((_, i) => (
        <div key={i}>
          <div className="flex sm:flex-row flex-col-reverse justify-between gap-5 py-5 animate-pulse pt-10">
            <div className="flex flex-col gap-3 sm:w-3/4 w-full">
              <div className="flex gap-5 items-center text-center">
                <div className="w-20 h-6 bg-gray-200 rounded-md"></div>
                <div className="w-32 h-4 bg-gray-200 rounded-md"></div>
              </div>
              <div>
                <div className="w-3/4 h-6 bg-gray-200 rounded-md mb-2"></div>
                <div className="w-full h-4 bg-gray-200 rounded-md mb-2"></div>
                <div className="w-1/2 h-4 bg-gray-200 rounded-md"></div>
              </div>
            </div>
            <div className="sm:w-1/4 w-full">
              <div className="w-full h-32 bg-gray-200 rounded aspect-video"></div>
            </div>
          </div>
          <div className="border-b p-1"></div>
        </div>
      ))}
    </>
  );
};
export default Loading;
