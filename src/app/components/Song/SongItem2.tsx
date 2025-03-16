"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { ButtonPlay } from "../Buttons/ButtonPlay";
import { ButtonWishlist } from "../Buttons/ButtonWishlist";
import { useEffect, useRef, useState } from "react";

export const SongItem2 = (props: any) => {

  const { item } = props;
  const [totalTime, setTotalTime] = useState<string>("-:--");
  const [singers, setSingers] = useState<string>("---");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener("loadedmetadata", () => {
        const duration = audioRef.current?.duration || 0;
        setTotalTime(formatTime(duration));
      });
    }
  }, [item.audio]);

  useEffect(() => {
    if (item.singers) {
      setSingers(item.singers);
    }
  }, [item]);

  // Hàm định dạng thời gian thành phút:giây
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <>
      <div className=" mt-[20px] flex items-center justify-between bg-bg2 py-[10px] px-[18px] rounded-[15px] " song-id={item.id}>
        <div className="flex gap-[12px]">
          <ButtonPlay item={item} className="text-[#ffffff] text-[24px]  hover:text-primary transition-colors duration-200 button-play hover:cursor-pointer" />
          <Link href={item.link} className="flex items-center gap-[12px]">
            <div className="h-[50px] w-[50px] rounded-[8px] overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-200 hover:scale-[120%]"
              />
            </div>
            <div className="font-[700] text-[14px] leading-[17px] text-[#ffffff] hover:text-primary transition-colors duration-200 ">
              {item.title}
            </div>
          </Link>
        </div>
        <div className="flex w-[45%] justify-between line-clamp-1 gap-[40px]">
          <div className="font-[400] text-[14px] leading-[17px] text-[#ffffff]">
            {singers}
          </div>
          <div className="flex gap-[18px] items-center">
            <audio ref={audioRef} className="hidden">
              <source src={item.audio} />
            </audio>
            <div className="font-[400] text-[14px] leading-[17px] text-[#ffffff]">
              {totalTime}
            </div>
            <ButtonWishlist Title="bỏ yêu thích" item={item} className="text-[#ffffff] bg-primary/0 text-[24px] hover:text-primary transition-colors duration-200 hover:cursor-pointer" />
          </div>
        </div>
      </div>
    </>
  )
}