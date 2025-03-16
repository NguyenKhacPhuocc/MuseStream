"use client";
import { BsFillSkipEndFill, BsFillSkipStartFill } from "react-icons/bs"
import { FaPause, FaPlay } from "react-icons/fa"
import { TbRepeat, TbRepeatOnce } from "react-icons/tb";
import { MdOutlineLyrics } from "react-icons/md";
import Link from "next/link";
import { useSong } from "../Context/SongContext";
import { useRouter } from 'next/navigation';

export const PlaySwitch = () => {
  const { linkSong } = useSong();
  const router = useRouter();
  const handleLyrics = () => {
    if (linkSong) {
      router.push(`${linkSong}`); // Điều hướng bằng router.push
    } else {
      alert('Please select a song first!');
    }
  };

  const handlePlay = () => {
    const elementPlayAudio = document.querySelector(".play-audio") as HTMLElement | null;
    if (!elementPlayAudio) return; // Kiểm tra nếu phần tử không tồn tại

    const elementPlay = elementPlayAudio.querySelector(".button-switch-state") as HTMLElement | null;
    if (!elementPlay) return; // Kiểm tra nếu phần tử không tồn tại

    const elementAudio = elementPlayAudio?.querySelector('.inner-audio') as HTMLAudioElement | null;
    if (!elementAudio) return; // Kiểm tra nếu phần tử không tồn tại

    if (elementPlay.classList.contains("play")) {
      elementPlay.classList.remove("play");
      elementAudio.pause();
    } else {
      elementPlay.classList.add("play");
      elementAudio.play();
    }
  };

  const handleNext = () => {
    const currentSong = document.querySelector("[song-id].activeSong") as HTMLElement | null;
    if (currentSong) {
      const nextSong = currentSong.nextElementSibling as HTMLElement | null;
      if (nextSong) {
        const buttonPlay = nextSong.querySelector(".inner-button-play") || nextSong.querySelector(".button-play");
        if (buttonPlay) {
          (buttonPlay as HTMLElement).click();
        }
      }
    }
  };

  const handleBack = () => {
    const currentSong = document.querySelector("[song-id].activeSong") as HTMLElement | null;
    if (currentSong) {
      const prevSong = currentSong.previousElementSibling as HTMLElement | null;
      if (prevSong) {
        const buttonPlay = prevSong.querySelector(".inner-button-play") || prevSong.querySelector(".button-play");
        if (buttonPlay) {
          (buttonPlay as HTMLElement).click();
        }
      }
    }
  };

  const handleRepeat = () => {
    const elementRepeatAudio = document.querySelector(".play-audio") as HTMLElement | null;
    if (!elementRepeatAudio) return; // Kiểm tra nếu phần tử không tồn tại

    const elementRepeat = elementRepeatAudio.querySelector(".button-switch-repeat") as HTMLElement | null;
    if (!elementRepeat) return; // Kiểm tra nếu phần tử không tồn tại

    const elementAudio = elementRepeatAudio?.querySelector('.inner-audio') as HTMLAudioElement | null;
    if (!elementAudio) return; // Kiểm tra nếu phần tử không tồn tại

    if (elementRepeat.classList.contains("repeat")) {
      elementRepeat.classList.remove("repeat");
      elementAudio.loop = !elementAudio.loop;
    } else {
      elementRepeat.classList.add("repeat");
      elementAudio.loop = !elementAudio.loop;
    }
  };

  return (
    <>
      <div className="flex gap-[42px] items-center justify-center">
        <Link
          href={linkSong ? linkSong : ""}
          className="text-[20px]  text-white hover:bg-primary rounded-[50%] p-[4px] transition-colors duration-100 hover:cursor-pointer button-show-lyric "
          onClick={handleLyrics}
        >
          <MdOutlineLyrics />
        </Link>
        <button
          className="text-[22px]  text-white hover:bg-primary rounded-[50%] p-[2px] transition-colors duration-100 hover:cursor-pointer"
          onClick={handleBack}
        >
          <BsFillSkipStartFill />
        </button>
        <button
          className="text-[19px] text-white w-[38px] aspect-square bg-primary rounded-[50%] flex justify-center items-center hover:text-[22px] button-switch-state duration-100 hover:cursor-pointer"
          onClick={handlePlay}>
          <FaPlay className="button-play" />
          <FaPause className="button-pause" />
        </button>
        <button
          className="text-[22px]  text-white hover:bg-primary rounded-[50%] p-[2px] transition-colors duration-100 hover:cursor-pointer"
          onClick={handleNext}>
          <BsFillSkipEndFill />
        </button>
        <button
          className="text-[22px]  text-white hover:bg-primary rounded-[50%] p-[2px] transition-colors duration-100 hover:cursor-pointer button-switch-repeat"
          onClick={handleRepeat}
        >
          <TbRepeat className="button-repeat" />
          <TbRepeatOnce className="button-unrepeat" />
        </button>
      </div>

    </>
  )
}