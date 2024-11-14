import Image from "next/image";
import notfound from "./../image/notfound.png";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center flex-col gap-3 h-screen">
      <p className="font-semibold text-6xl">Oopss..</p>
      <div className="flex flex-col justify-center text-center">
        <p className="text-red-500 font-medium text-xl">
          Sorry, the page you are looking for does not exist.
        </p>
      </div>
      <Image src={notfound} alt="not-found" width={500} height={500} />
    </div>
  );
};
export default NotFound;
