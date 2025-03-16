"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { SongItem2 } from "@/app/components/Song/SongItem2";
import { Title } from "@/app/components/Title/Title";
import { authFirebase, dbFirebase } from "@/app/firebaseConfig";
import { onValue, ref } from "firebase/database";

export default function SongWishListPage() {
  const userId: any = authFirebase?.currentUser?.uid;
  const dataWishlistSong: any = []
  onValue(ref(dbFirebase, '/songs/'), (items) => (
    items.forEach((item) => {
      const key = item.key;
      const data = item.val();
      if (data.wishlist?.[userId]) {
        const listNameSinger: any = [];
        for (let index = 0; index < data.singerId.length; index++) {
          const element = data.singerId[index];
          onValue(ref(dbFirebase, '/singers/' + element), (item) => (
            listNameSinger.push(item.val().title)
          ))
        }

        dataWishlistSong.push({
          id: key,
          image: data.image,
          title: data.title,
          singers: listNameSinger.join(', '),
          listen: data.listen,
          wishlist: data.wishlist?.[userId],
          link: '/songs/' + key,
          audio: data.audio,
        })
      }
    })
  ))
  if (dataWishlistSong.length == 0) {
    return (
      <>
        <section className="">
          <Title text={"Bài Hát Yêu Thích"} />
          <Title text={"Chưa có bài hát yêu thích."} />
        </section>
      </>
    )
  }

  return (
    <>
      <section className="">
        <Title text={"Bài Hát Yêu Thích"} />
        {dataWishlistSong.map((item: any, index: number) => (
          <SongItem2 key={index} item={item} />
        ))}
      </section>
    </>
  );
}
