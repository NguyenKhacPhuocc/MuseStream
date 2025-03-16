/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { SongSection1 } from "./components/SongSection1/SongSection1";
import { Section2HomePage } from "./components/Section2HomePage/Section2HomePage";
import { Section3HomePage } from "./components/Section3HomePage/Section3HomePage";

export const metadata: Metadata = {
  title: "MuseStream",
  description: "Nghe nhạc trực tuyến",
};

export default function Home() {

  return (
    <>
      <section className="flex xl:gap-[20px] xl:mb-[30px] md:gap-[15px] md:mb-[20px] ">
        <div className="lg:w-[534px] md:w-[53%]">
          <div
            className="w-full flex items-center bg-cover rounded-[15px]"
            style={{ backgroundImage: "url('/demo/bg-home-1.png' " }}
          >
            <div className="ml-[30px] flex-1 xl:mr-[34px] lg:mr-[25px]">
              <h3 className="font-[700] xl:text-[32px] lg:text-[26px] md:text-[24px] text-[#ffffff]  mb-[6px]">
                Nhạc EDM
              </h3>
              <div className="font-[500] xl:text-[14px]  md:text-[11px] lg:text-[12px] text-[#ffffff] ">
                Top 100 Nhạc Electronic/Dance Âu Mỹ là danh sách 100 ca khúc hot nhất hiện tại của thể loại Top 100 Nhạc Electronic/Dance Âu Mỹ
              </div>
            </div>
            <div className="xl:w-[215px] md:w-[160px] xl:mt-[40px] xl:mr-[24px] lg:mt-[60px] lg:mr-[20px] md:mt-[40px] md:mr-[15px] ">
              <img
                src="/demo/bg-home-2.png"
                alt="background 2"
                className="w-full h-auto"
                rel="preload"
              />
            </div>
          </div>
        </div>

        <SongSection1 />
      </section>

      <Section2HomePage />

      <Section3HomePage />
    </>
  );
}
