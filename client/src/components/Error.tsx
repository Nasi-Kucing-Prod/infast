export default function Error() {
  return (
    <>
      <div className="flex flex-col h-1/2 mx-36 my-12 max-[767px]:mx-5 max-[767px]:my-5 justify-center items-center gap-2 text-center">
        <h1 className="font-semibold text-primary-infast sm:text-5xl text-2xl">
          Oopss..!
        </h1>
        <h5 className="text-gray-600 text-base max-[767px]:text-sm">
          Something went wrong. PLease try again later.
        </h5>
      </div>
    </>
  );
}
