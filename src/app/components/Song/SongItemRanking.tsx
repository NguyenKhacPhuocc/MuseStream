/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import { ButtonPlay } from "../Buttons/ButtonPlay";
import { ButtonWishlist } from "../Buttons/ButtonWishlist";

export const SongItemRanking = (props: any) => {

  const { item } = props;
  return (
    <>
      <Link href={item.link} className=" mt-[10px] flex items-center justify-between hover:bg-bg2 py-[10px] px-[18px] rounded-[15px] item group" song-id={item.id}>
        <div className="flex gap-[12px] items-center">
          <div className="text-white text-[20px]  group-hover:hidden w-[24px] ">{item.index}</div>
          {/* onClick={(e) => e.preventDefault()} ngăn sự kiện của thẻ cha */}
          <div onClick={(e) => e.preventDefault()}>
            <ButtonPlay
              item={item}
              className="text-[#ffffff] text-[24px] hover:text-primary transition-colors duration-200 invisible group-hover:visible group-hover:block button-play group-hover:mr-[20px] group-hover:hover:cursor-pointer"
            />
          </div>
          <div className="flex items-center gap-[12px]">
            <div className="h-[50px] w-[50px] rounded-[8px] overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-100 group-hover:scale-[120%]"
              />
            </div>
            <div className="font-[700] text-[14px] leading-[17px] text-[#ffffff] group-hover:text-primary transition-colors duration-200 ">
              {item.title}
            </div>
          </div>
        </div>
        <div className="flex w-[45%] justify-between line-clamp-1 gap-[40px]">
          <div className="font-[400] text-[14px] leading-[17px] text-[#ffffff]">
            {item.singers}
          </div>
          <div className="items-center font-[400] text-[14px] leading-[17px] text-[#ffffff] flex gap-[20px]">
            <div className="">
              {item.listen.toLocaleString("vi-VN")} lượt nghe
            </div>
            <div className="" onClick={(e) => e.preventDefault()}>
              <ButtonWishlist item={item} className="text-[#ffffff] bg-primary/0 text-[24px] hover:text-primary transition-colors duration-200 hover:cursor-pointer" />
            </div>
          </div>
        </div>
      </Link>
    </>
  )
}