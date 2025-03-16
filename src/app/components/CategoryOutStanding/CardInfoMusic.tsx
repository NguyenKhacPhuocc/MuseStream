/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client"
import { ButtonPlay } from "../Buttons/ButtonPlay";
import { ButtonWishlist } from "../Buttons/ButtonWishlist";

export const CardInfoMusic = (props: { image: string, title: string, description: string, audio: string, wishlist: boolean, listen: any, id: any }) => {
  const { image, title, description, audio, wishlist, listen, id } = props;
  const detailSong = {
    image,
    title,
    singers: description,
    audio,
    wishlist,
    listen,
    id,
  };
  return (
    <>
      <div className="flex gap-[20px] mb-[30px]">
        <div className="w-[180px] h-[180px] rounded-[15px] overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 flex flex-col justify-center">
          <div className="font-[700] text-[35px] leading-[42px]  text-primary mb-[10px] ">
            {title}
          </div>
          <div className="font-[400] text-[14px] leading-[17px] text-[#EFEEE0]">
            {description}
          </div>
          <div className="flex gap-[10px] mt-[20px]">
            <ButtonPlay item={detailSong} className="text-[17px] text-white w-[40px] h-[40px] rounded-[50%] flex justify-center items-center border border-white inner-button-play  hover:bg-primary hover:border-primary transition-colors duration-200 " />
            <ButtonWishlist item={detailSong} className="text-[17px] text-white w-[40px] h-[40px]  rounded-full flex justify-center items-center border hover:bg-primary hover:border-primary  transition-colors duration-200 " />
          </div>
        </div>
      </div>
    </>
  )
}

