"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */

import { SongItem2 } from "@/app/components/Song/SongItem2"
import { dbFirebase } from "@/app/firebaseConfig";
import { get, onValue, ref } from "firebase/database";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
 
export const Section1 = () => {
  const searchParams = useSearchParams();
  const [dataFinal, setDataFinal] = useState<any[]>([]);
  const searchKey = searchParams.get("key") || "";

  // const dataSongSearch: any[] = []


  useEffect(() => {
    const dataSection1: any[] = [];
    const fetchData = async () => {
      const items = await get(ref(dbFirebase, 'songs'));
      items.forEach((item: any) => {
        const key = item.key;
        const data = item.val();
        if (data.title.toLowerCase().includes(searchKey.toLowerCase())) {
          const listNameSinger: any = [];
          for (let index = 0; index < data.singerId.length; index++) {
            const element = data.singerId[index];
            onValue(ref(dbFirebase, '/singers/' + element), (item) => {
              listNameSinger.push(item.val().title);
            })
          }

          dataSection1.push({
            id: key,
            image: data.image,
            title: data.title,
            singers: listNameSinger.join(', '),
            listen: data.listen,
            time: "4:32",
            link: "/songs/" + key,
            audio: data.audio,
          });
        }
        setDataFinal(dataSection1);
      })
    }
    fetchData();
  }, [searchKey])

  return (
    <>
      {dataFinal.length > 0 ? (
        dataFinal.map((item, index) => (
          <SongItem2 item={item} key={index} />
        ))
      ) : (
        <div className=" mt-[20px] flex items-center justify-between bg-bg2 py-[10px] px-[18px] rounded-[15px]">
          <Skeleton />
        </div>
      )}
    </>
  )
}

