/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { authFirebase, dbFirebase } from "@/app/firebaseConfig";
import { SongItem } from "../Song/SongItem";
import { Title } from "../Title/Title";
import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";

interface Song {
  id: string;
  image: string;
  title: string;
  singers: string[];
  listen: number;
  link: string,
  audio: string,
  wishlist?: boolean,
}

export const SongSection1 = () => {
  // data section 1
  const [data1, setData1] = useState<Song[]>([]);
  const userId: any = authFirebase?.currentUser?.uid;
  useEffect(() => {
    const categoryRef = ref(dbFirebase, "songs");
    onValue(categoryRef, (items) => {
      const newData: Song[] = [];
      items.forEach((item) => {
        const key = item.key;
        const data = item.val();
        if (newData.length < 3) {
          const listNameSinger: any = [];
          for (let index = 0; index < data.singerId.length; index++) {
            const element = data.singerId[index];
            onValue(ref(dbFirebase, '/singers/' + element), (itemNameSinger) => {
              listNameSinger.push(itemNameSinger.val().title);
            })
          }
          newData.push(
            {
              id: key,
              image: data.image,
              title: data.title,
              singers: listNameSinger.join(", "),
              listen: data.listen,
              link: "/songs/" + key,
              audio: data.audio,
              wishlist: data.wishlist?.[userId],
            }
          );
        };
      });
      setData1(newData);
    });
  }, []);
  // data section 1

  return (
    <>
      <div className="flex-1">
        <Title text="Nghe Nhiều" />
        {/* item */}
        <div className="xl:mt-[20px] lg:mt-[10px] md:mt-[7px] grid grid-rows-1 xl:gap-[12px] md:gap-[7px] " >
          {data1.map((item, index) => (
            <SongItem key={index} item={item} />
          ))}
        </div>
      </div>
    </>
  )
}