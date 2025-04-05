/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { ButtonPlay } from "../Buttons/ButtonPlay";
import { ButtonWishlist } from "../Buttons/ButtonWishlist";

export const SongItem = (props: { item: any }) => {
  const { item } = props;
  return (
    <>
      <div
        className="flex bg-bg2 lg:p-[10px] md:p-[7px] rounded-[15px] justify-between items-center "
        song-id={item.id}
        data-aos="fade-left" data-aos-duration="800"
      >
        <div className="flex items-center">
          <Link
            href={item.link}
            className="mr-[10px] xl:w-[76px] xl:h-[76px] md:w-[60px] md:h-[60px] rounded-[10px] truncate flex justify-center items-center"
          >
            <img
              src={item.image} alt={item.title} className="w-full h-full object-cover transform transition-transform duration-200 hover:scale-[120%]" />
          </Link>
          <div className="">
            <Link
              href={item.link}
              className="font-[600] text-white xl:text-[16px] md:text-[14px] leading-[19px] hover:text-primary transition-colors duration-200 line-clamp-1">
              {item.title}
            </Link>
            <div
              className="font-[400] text-[#FFFFFF80] text-[12px] leading-[15px] mt-[5px] line-clamp-1">
              {item.singers}
            </div>
            <div
              className="font-[400] text-[#FFFFFF] text-[12px] leading-[15px] mt-[8px] line-clamp-1">
              {item.listen.toLocaleString("vi-VN")} lượt nghe
            </div>
          </div>
        </div>
        <div className="flex lg:gap-[15px] md:gap-[10px]  ">
          <ButtonPlay item={item} className="text-[17px] text-white xl:w-[40px] xl:h-[40px] md:w-[35px] md:h-[35px] rounded-[50%] flex justify-center items-center border border-white inner-button-play  hover:bg-primary hover:border-primary transition-colors duration-200 hover:cursor-pointer" />
          <ButtonWishlist item={item} className=" text-[17px] text-white xl:w-[40px] xl:h-[40px] md:w-[35px] md:h-[35px]  rounded-full justify-center items-center border hover:bg-primary hover:border-primary  transition-colors duration-200 lg:flex md:hidden hover:cursor-pointer" />
        </div>
      </div>
    </>
  )
}