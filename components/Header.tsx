import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex flex-col xs:flex-row justify-between items-center w-full mt-3 border-b pb-7 sm:px-4 px-2 border-gray-500 gap-2">
      <Link href="/" className="flex space-x-2">
        <Image
          alt="header text"
          src="/genius.svg"
          // className="sm:w-10 sm:h-10 w-9 h-9"
          width={200}
          height={300}
        />
        {/* <h1 className="sm:text-3xl text-xl font-bold ml-2 tracking-tight">
          geniusGPT
        </h1> */}
      </Link>
    </header>
  );
}
