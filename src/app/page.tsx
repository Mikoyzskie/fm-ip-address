"use client";
import dynamic from "next/dynamic";
const DynamicMapComponent = dynamic(() => import("@/components/Map"), { ssr: false });
import Image from "next/image";
import Map from "@/app/Mat"
import Form from "@/components/Form";

export default function Home() {

  return (
    <div className="flex flex-col min-h-screen">
      <section>
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
            <Form />
          </div>
        </div>
      </section>
      <section className="grow  h-full">
        <DynamicMapComponent />
      </section>
    </div>
  );
}
