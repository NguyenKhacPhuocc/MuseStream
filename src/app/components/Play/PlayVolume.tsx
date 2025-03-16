/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { IoVolumeHigh, IoVolumeMute, IoVolumeMedium, IoVolumeLow, IoVolumeOff } from "react-icons/io5";
import { useState } from "react";

export const PlayVolume = () => {
  const [volumeLevel, setVolumeLevel] = useState<number>(100); // Lưu giá trị âm lượng hiện tại
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const handleChange = (event: any) => {
    const elementPlayAudio = document.querySelector(".play-audio");
    const elementAudio: any = elementPlayAudio?.querySelector(".inner-audio");
    const elementVolumeCurrent: any = elementPlayAudio?.querySelector(".play-volume .inner-volume-current");
    const VolumeShow = event.target;
    const value = parseFloat(VolumeShow.value);
    // Cập nhật giao diện thanh trượt và âm lượng
    elementVolumeCurrent.style.width = `${value}%`;
    elementAudio.volume = value / 100;
    if (value !== 0) {
      setIsMuted(false);
    }

    // Cập nhật trạng thái âm lượng
    setVolumeLevel(value);
  };

  const toggleMute = () => {
    const elementAudio: any = document.querySelector(".inner-audio");
    const elementVolumeCurrent: any = document.querySelector(".play-volume .inner-volume-current");
    const elementVolumeShow: any = document.querySelector(".play-volume .inner-volume-show");
    if (isMuted) {
      // Nếu đang mute, bật lại âm lượng cũ
      setIsMuted(false);
      if (elementAudio) {
        elementAudio.volume = volumeLevel / 100;
        elementVolumeCurrent.style.width = `${volumeLevel}%`;
        elementVolumeShow.value = volumeLevel;
      }
    } else {
      // Nếu không mute, chuyển sang mute
      setIsMuted(true);
      if (elementAudio) {
        elementAudio.volume = 0;
        elementVolumeCurrent.style.width = `0%`;
        elementVolumeShow.value = 0;
      }
    }
  };

  const getVolumeIcon = () => {
    if (volumeLevel === 0) return <IoVolumeMute />;
    if (volumeLevel <= 20) return <IoVolumeOff />;
    if (volumeLevel <= 50) return <IoVolumeLow />;
    if (volumeLevel <= 70) return <IoVolumeMedium />;
    return <IoVolumeHigh />;
  };

  return (
    <>
      <div className="flex gap-[6px] items-center justify-end play-volume">
        <button onClick={toggleMute} className="text-[20px] hover:cursor-pointer button-volume-change">
          {isMuted ? (
            <IoVolumeMute className="v-mute" />
          ) : (
            getVolumeIcon()
          )}
        </button>
        <div className="relative flex items-center">
          <div className="h-[5px] w-[100%] bg-primary rounded-[50px] absolute left-0 top-[0px] hover:cursor-pointer inner-volume-current"></div>
          <input
            type="range"
            min={0}
            max={100}
            defaultValue={100}
            className="w-full cursor-pointer appearance-none rounded-[50px] bg-[#ffffff0a] h-[4px] range-sm inner-volume-show "
            onChange={handleChange}
          />
        </div>
      </div>
    </>
  );
};
