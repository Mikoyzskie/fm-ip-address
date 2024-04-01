import Image from "next/image";

export default function Home() {
  return (
    <main>
      <div className="relative">
        <Image
          src={"/pattern-bg-desktop.png"}
          alt="background pattern"
          height={280}
          width={1440}
          priority
          className="h-[280px] w-full object-cover"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center pt-[33px] tracking-[-0.29px]">
          <h1 className="font-medium text-[32px] text-white leading-[30px] mb-8">IP Address Tracker</h1>
          <div className="max-w-[555px] w-full h-[58px] rounded-[15px] overflow-hidden flex">
            <input type="text" name="" id="" placeholder="Search for any IP address or domain" className="outline-none w-full px-6 py-[18px] text-lg leading-[21px]" />
            <button className="size-[58px] h-full bg-black flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="11" height="14"><path fill="none" stroke="#FFF" stroke-width="3" d="M2 1l6 6-6 6" /></svg>
            </button>
          </div>
          <div className="max-w-[1110px] relative -bottom-[81px] w-full h-[161px] bg-white shadow-md rounded-[15px]">

          </div>
        </div>
      </div>
    </main>
  );
}
