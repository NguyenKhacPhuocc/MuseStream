/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { CardInfoMusic } from "@/app/components/CategoryOutStanding/CardInfoMusic";
import SongSameCategory from "@/app/components/SongSameCategory/SongSameCategory";
import { Title } from "@/app/components/Title/Title";
import { authFirebase, dbFirebase } from "@/app/firebaseConfig";
import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";

export default function SongDetail(props: any) {
  const userId: any = authFirebase?.currentUser?.uid;
  const { id } = props;
  const [detailSong, setDetailSong] = useState<any>(null);

  useEffect(() => {
    const detailSongg: any = [];
    onValue(ref(dbFirebase, '/songs/' + id), (items) => {
      const data = items.val();
      const listNameSinger: any = [];
      for (let index = 0; index < data.singerId.length; index++) {
        const element = data.singerId[index];
        onValue(ref(dbFirebase, '/singers/' + element), (item) => {
          listNameSinger.push(item.val().title);
        })
      }
      detailSongg.push({
        image: data.image,
        title: data.title,
        singers: listNameSinger.join(', '),
        lyric: data.lyric,
        id: data.categoryId,
        audio: data.audio,
        wishlist: data.wishlist ? data.wishlist[userId] : false,
        listen: data.listen,
      })
    })
    setDetailSong(detailSongg[0]);
  }, [id, userId]);

  return (
    <>
      <CardInfoMusic
        image={detailSong ? detailSong.image : '/icon-logo.png'}
        title={detailSong ? detailSong.title : 'tieu-de'}
        description={detailSong ? detailSong.singers : 'ca-si'}
        audio={detailSong ? detailSong.audio : 'link-audio'}
        wishlist={detailSong ? detailSong.wishlist : false}
        listen={detailSong ? detailSong.listen : 0}
        id={id}
      />

      <section className="">
        <Title text={"Lời Bài Hát"} />
        <div className="p-[20px] bg-bg2 rounded-[15px] mb-[30px] mt-[20px]">
          <div className="font-[500] text-[14px] text-white whitespace-pre-line">
            {/* Kiểm tra xem lyric có dữ liệu không */}
            {detailSong && detailSong.lyric
              ? detailSong.lyric.split("\\n").map((line: string, index: number) => (
                <span key={index}>
                  {line}
                  <br />
                </span>
              ))
              : <p>Không có lời bài hát</p> // Hiển thị thông báo nếu không có lời bài hát
            }
          </div>
        </div>
      </section>

      <SongSameCategory idSong={id} idCategory={detailSong ? detailSong.id : 0} />
    </>
  );
}
