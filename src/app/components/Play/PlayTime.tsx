"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
export const PlayTime = () => {

  const handleChange = (event: any) => {
    const elementPlayAudio = document.querySelector(".play-audio");
    const elementAudio: any = elementPlayAudio?.querySelector('.inner-audio');
    const elementShow = event.target;
    const value = parseFloat(elementShow.value);
    elementAudio.currentTime = value;

  }
  return (
    <>
      <div className="flex justify-between gap-[12px] items-center">
        <div className="text-[12px] w-[20px] text-right mt-[7px] current-time">-:--</div>
        <div className="relative play-time flex-1">
          <div className="h-[5px] bg-primary rounded-[50px] absolute left-0 top-[13px] play-time-current"></div>
          <input
            type="range"
            min={0}
            max={0}
            defaultValue={0}
            className="w-full cursor-pointer appearance-none rounded-[50px] bg-[#ffffff0a]  h-[4px] range-sm play-time-show"
            onChange={handleChange}
          />
        </div>
        <div className="text-[12px] w-[20px] text-left mt-[7px] total-time">-:--</div>
      </div>
    </>
  )
}