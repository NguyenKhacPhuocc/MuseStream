import { PlayInfo } from "./PlayInfo";
import { PlaySwitch } from "./PlaySwitch";
import { PlayTime } from "./PlayTime";
import { PlayVolume } from "./PlayVolume";

export const Play = () => {
  return (
    <>
      <div className="bg-[#212121] fixed bottom-0 right-0 w-full z-[999] border-t border-[#494949] py-[20px] play-audio hidden">
        <audio className="hidden inner-audio">
          <source src="/" />
        </audio>
        <div className="container mx-auto">
          <div className="text-white flex gap-[67px] justify-between items-center">
            <PlayInfo />
            <div className="flex-1">
              <PlaySwitch />
              <PlayTime />
            </div>
            <PlayVolume />
          </div>
        </div>
      </div>
    </>
  )
}