/* eslint-disable @next/next/no-img-element */

import Link from "next/link";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const CategoryOutStanding = (props: { item: any }) => {
  const { item } = props;
  return (
    <>
      <Link href={item.link} className="flex flex-col gap-[10px] p-[10px] rounded-[12px] hover:bg-[#1F1F1F]  transition-colors ">
        <div className="w-[100%] aspect-[1/1] overflow-hidden  rounded-[10px] ">
          <img
            loading="lazy"
            src={item.image} alt={item.title}
            className="w-full h-full object-cover transform transition-transform duration-200 hover:scale-[120%]"
          />
        </div>
        <div className="font-[700] text-[14px] leading-[18px] text-[#ffffff] hover:text-primary transition-colors duration-200">
          {item.title}
        </div>
        <div className="font-[400] text-[12px] leading-[15px] text-[#FFFFFF80] line-clamp-1">
          {item.description}
        </div>
      </Link>
    </>
  )
}