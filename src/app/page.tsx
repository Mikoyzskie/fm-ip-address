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
          <div className="max-w-[555px] w-full flex ">
            <div className="px-6 py-[18px] bg-white w-full rounded-l-[15px]">
              <input type="text" placeholder="Search for any IP address or domain" className="outline-none w-full text-lg h-full leading-[21px]" />
            </div>

            <button className="w-[58px] h-full bg-black flex items-center justify-center rounded-r-[15px]">
              <svg xmlns="http://www.w3.org/2000/svg" width="11" height="14"><path fill="none" stroke="#FFF" strokeWidth="3" d="M2 1l6 6-6 6" /></svg>
            </button>
          </div>
          <div className="max-w-[1110px] relative -bottom-1/4 w-full bg-white shadow-md rounded-[15px] px-8 py-9 grid grid-cols-4 gap-8 items-start">
            <div className="flex justify-between items-start">
              <div className="flex flex-col items-start gap-[13px]">
                <p className="tracking-[1.75px] text-xs font-bold text-[rgba(44,44,44,0.5)]">IP Address</p>
                <h2 className="text-[#2C2C2C] text-[26px] leading-[30px] font-bold -tracking-[0.23px]">192.212.174.101</h2>
              </div>
              <svg width="1" height="75" viewBox="0 0 1 75" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect opacity="0.15" width="1" height="75" fill="black" />
              </svg>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex flex-col items-start gap-[13px]">
                <p className="tracking-[1.75px] text-xs font-bold text-[rgba(44,44,44,0.5)]">Location</p>
                <h2 className="text-[#2C2C2C] text-[26px] leading-[30px] font-bold -tracking-[0.23px]">Brooklyn, NY 10001</h2>
              </div>
              <svg width="1" height="75" viewBox="0 0 1 75" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect opacity="0.15" width="1" height="75" fill="black" />
              </svg>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex flex-col items-start gap-[13px]">
                <p className="tracking-[1.75px] text-xs font-bold text-[rgba(44,44,44,0.5)]">Timezone</p>
                <h2 className="text-[#2C2C2C] text-[26px] leading-[30px] font-bold -tracking-[0.23px]">UTC -05:00</h2>
              </div>
              <svg width="1" height="75" viewBox="0 0 1 75" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect opacity="0.15" width="1" height="75" fill="black" />
              </svg>
            </div>
            <div className="flex flex-col items-start">
              <p className="tracking-[1.75px] text-xs font-bold text-[rgba(44,44,44,0.5)]">ISP</p>
              <h2 className="text-[#2C2C2C] text-[26px] font-bold -tracking-[0.23px]">SpaceX Starlink</h2>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
