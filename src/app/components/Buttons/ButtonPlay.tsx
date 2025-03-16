/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { dbFirebase } from "@/app/firebaseConfig";
import { ref, update } from "firebase/database";
import { FaPlay } from "react-icons/fa";
import { useSong } from "../Context/SongContext";

export const ButtonPlay = (props: any) => {

  const { item, className } = props;
  const { setLinkSong } = useSong();

  const handlePlay = () => {
    // phát nhạc
    const audio = item.audio;
    const elementPlayAudio = document.querySelector(".play-audio");
    const elementPlay: any = elementPlayAudio?.querySelector(".button-switch-state");
    const elementAudio: any = elementPlayAudio?.querySelector('.inner-audio');
    const elementSource = elementAudio?.querySelector('source');
    if (elementSource) {
      elementSource.src = audio;
    }
    if (elementAudio) {
      elementAudio.load();
      elementAudio.play();
    }
    // phát nhạc


    // hiển thị khối play
    elementPlayAudio?.classList.remove('hidden');
    // hiển thị ảnh
    const innerImage: any = elementPlayAudio?.querySelector(".inner-image");
    if (innerImage) {
      innerImage.src = `${item.image}`
    }
    //hiển thị tên bài hát
    const innerTitle: any = elementPlayAudio?.querySelector(".inner-title");
    if (innerTitle) {
      innerTitle.innerHTML = `${item.title}`
    }
    //hiển thị tên ca sĩ
    const innerSinger: any = elementPlayAudio?.querySelector(".inner-singers");
    if (innerSinger) {
      innerSinger.innerHTML = `${item.singers}`
    }


    // thêm đường link hiển thị lời bài hát
    setLinkSong(`${item.link}`);



    const PlayState = elementPlayAudio?.querySelector(".button-switch-state");
    PlayState?.classList.add("play");

    // lấy thời gian tổng của bài hát
    const elementPlayTimeCurrent: any = elementPlayAudio?.querySelector(".play-time .play-time-current");
    const elementPlayTimeShow: any = elementPlayAudio?.querySelector(".play-time .play-time-show");

    elementAudio.onloadedmetadata = () => {
      const elementTotalTime = elementPlayAudio?.querySelector(".total-time");
      const elementCurrentTime = elementPlayAudio?.querySelector(".current-time");
      const totalTime = elementAudio.duration;
      elementPlayTimeShow.max = totalTime;
      // cập nhật lượt nghe
      let listenTime = 0; // Biến lưu thời gian đã nghe
      let listenTracked = false;

      if (elementTotalTime) {
        const totalTimeRounded = Math.round(totalTime); // Làm tròn số nguyên
        const minutes = Math.floor(totalTimeRounded / 60); // Lấy số phút
        const seconds = totalTimeRounded % 60; // Lấy số giây còn lại
        const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`; // Định dạng phút:giây
        elementTotalTime.innerHTML = formattedTime; // Gán vào HTML
      }
      // lấy ra thời gian hiện tại
      elementAudio.ontimeupdate = () => {
        const currentTime = elementAudio.currentTime;
        const percent = currentTime * 100 / totalTime;
        elementPlayTimeCurrent.style.width = `${percent}%`;
        elementPlayTimeShow.value = currentTime;
        if (percent >= 100) {
          elementPlay.classList.remove("play");
          elementAudio.pause();
          const currentSong = document.querySelector("[song-id].activeSong");
          if (currentSong) {
            const nextSong = currentSong.nextElementSibling;
            if (nextSong) {
              const buttonPlay: any = nextSong.querySelector(".inner-button-play") || nextSong.querySelector(".button-play");
              buttonPlay?.click();
            }
          }
        }
        if (elementCurrentTime) {
          const currentTimeRounded = Math.round(currentTime); // Làm tròn số nguyên
          const minutes = Math.floor(currentTimeRounded / 60); // Lấy số phút
          const seconds = currentTimeRounded % 60; // Lấy số giây còn lại
          const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`; // Định dạng phút:giây
          elementCurrentTime.innerHTML = formattedTime; // Gán vào HTML
        }
        // Đếm thời gian người dùng nghe thực sự
        if (!elementAudio.paused && !elementAudio.seeking) {
          listenTime += 0.1; // Cộng dồn mỗi 100ms (thời gian ontimeupdate gọi lại)
        }
        // Nếu người dùng nghe đủ 30 giây
        if (!listenTracked && listenTime >= 30) {
          listenTracked = true; // Đảm bảo chỉ tăng một lần

          // Cập nhật lượt nghe trong Firebase
          const songRef = ref(dbFirebase, `/songs/${item.id}`);
          update(songRef, { listen: (item.listen || 0) + 1 });
        }
      }
    }
    // xóa trạng thái play ở bài hát trước đó đang phát
    const elementSongOld = document.querySelector(`[song-id].activeSong`);
    if (elementSongOld) {
      elementSongOld.classList.remove("activeSong");
    }

    // thêm trạng thái play cho bài hát đang được bật
    const elementSong = document.querySelector(`[song-id = "${item.id}"]`);
    elementSong?.classList.add("activeSong");


    const expandMenu = document.querySelector(".expand-menu");
    if (expandMenu) {
      expandMenu.classList.toggle("bottom-[100px]")
    }

  }

  return (
    <>
      <button
        className={className}
        onClick={handlePlay}
      >
        <FaPlay />
      </button>
    </>
  )
}