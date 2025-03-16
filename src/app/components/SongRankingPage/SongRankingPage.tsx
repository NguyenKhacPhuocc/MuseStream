"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Title } from "@/app/components/Title/Title";
import { authFirebase, dbFirebase } from "@/app/firebaseConfig";
import { onValue, ref } from "firebase/database";
import { SongItemRanking } from "../Song/SongItemRanking";

export default function SongRankingPage() {
  const userId: any = authFirebase?.currentUser?.uid;
  const dataSongRanking: any = []
  onValue(ref(dbFirebase, '/songs/'), (items) => (
    items.forEach((item) => {
      const key = item.key;
      const data = item.val();
      const listNameSinger: any = [];
      for (let index = 0; index < data.singerId.length; index++) {
        const element = data.singerId[index];
        onValue(ref(dbFirebase, '/singers/' + element), (item) => (
          listNameSinger.push(item.val().title)
        ))
      }

      dataSongRanking.push({
        id: key,
        image: data.image,
        title: data.title,
        singers: listNameSinger.join(', '),
        time: "4:32",
        listen: data.listen,
        wishlist: data.wishlist?.[userId],
        link: '/songs/' + key,
        audio: data.audio,
      })
    })
  ))
  if (dataSongRanking.length == 0) {
    return (
      <>
        <section className="">
          <Title text={"Bài Hát Yêu Thích"} />
          <Title text={"Tải lại trang nếu chưa có thông tin bảng xếp hạng"} />
        </section>
      </>
    )
  }
  dataSongRanking.sort((a: any, b: any) => b.listen - a.listen);
  dataSongRanking.forEach((item: any, index: number) => {
    item.index = index + 1;
  });
  return (
    <>
      <section className="">
        <Title text={"Bảng xếp hạng lượt nghe"} />
        <div className=" mt-[20px] flex items-center justify-betwee py-[10px]  rounded-[15px]">
          <div className="flex-1 flex font-[700] text-[20px] text-[#ffffff]">
            <div className="">STT</div>
            <div className="ml-[75px]">Tiêu đề</div>
          </div>
          <div className="w-[45%] flex font-[700] text-[20px] text-[#ffffff] justify-between pr-[50px]">
            <div className="">Ca sĩ</div>
            <div className="">Lượt nghe</div>
          </div>
        </div>
        {dataSongRanking.map((item: any, index: number) => (
          <SongItemRanking key={index} item={item} />
        ))}
      </section>
    </>
  );
}
