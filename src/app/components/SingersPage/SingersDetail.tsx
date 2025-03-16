/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { CardInfo } from "@/app/components/CategoryOutStanding/CardInfo";
import { SongItem2 } from "@/app/components/Song/SongItem2";
import { Title } from "@/app/components/Title/Title";
import { authFirebase, dbFirebase } from "@/app/firebaseConfig";
import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";

export default function SingerDetail(props: any) {
  const userId: any = authFirebase?.currentUser?.uid;
  const { id } = props;
  const [detailSinger, setDetailSinger] = useState<any>(null);
  const [dataSong, setDataSong] = useState<any[]>([]);

  useEffect(() => {
    onValue(ref(dbFirebase, '/singers/' + id), (item) => {
      setDetailSinger(item.val());
    })
    
    const tempSongs: any[] = [];
    onValue(ref(dbFirebase, '/songs/'), (items) => {
      items.forEach((item) => {
        const key = item.key;
        const data = item.val();

        if (data.singerId.some((singers: any) => singers === id)) {
          const listNameSinger: any = [];
          for (let index = 0; index < data.singerId.length; index++) {
            const element = data.singerId[index];
            onValue(ref(dbFirebase, '/singers/' + element), (item) => {
              listNameSinger.push(item.val().title);
            })

          }
          tempSongs.push({
            id: key,
            image: data.image,
            title: data.title,
            singers: listNameSinger.join(", "),
            listen: data.listen,
            link: '/songs/' + key,
            audio: data.audio,
            wishlist: data.wishlist ? data.wishlist[userId] : false,
          })
        }
      });
      setDataSong(tempSongs);
    })
  }, [id, userId])




  return (
    <>
      <CardInfo
        image={detailSinger ? detailSinger.image : 'anh-ca-si'}
        title={detailSinger ? detailSinger.title : 'tieu-de'}
        description={detailSinger ? detailSinger.description : 'mo-ta'}
      />
      <section className="">
        <Title text={"Bài Hát"} />
        {dataSong.map((item: any, index: number) => (
          <SongItem2 key={index} item={item} />
        ))}
      </section>
    </>
  );
}
