/* eslint-disable @next/next/no-img-element */
export const PlayInfo = () => {
  return (
    <>
      <div className="px-[5px] flex gap-[13px] items-center w-[220px]">
        <div className="h-[49px] rounded-[5px] overflow-hidden aspect-square">
          <img
            src="/"
            alt="anh demo"
            className="inner-image w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 outer-container">
          <div className="text-[15px] font-[700] leading-[18px] inner-title line-clamp-1 marquee"></div>
          <div className="text-[12px] font-[700] leading-[14px] text-[#FFFFFF70] inner-singers"></div>
        </div>
      </div>
    </>
  )
}