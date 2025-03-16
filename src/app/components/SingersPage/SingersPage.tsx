/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Title } from "../Title/Title";
import { onValue, ref } from "firebase/database";
import { CategoryOutStanding } from "../CategoryOutStanding/CategoryOutStanding";
import { dbFirebase } from "@/app/firebaseConfig";
import { useEffect, useState } from "react";

export const SingersPage = () => {

  // const dataSinger: any = []

  // onValue(ref(dbFirebase, '/singers/'), (items) => {
  //   items.forEach(item => {
  //     const key = item.key;
  //     const data = item.val();

  //     dataSinger.push({
  //       id: key,
  //       image: data.image,
  //       title: data.title,
  //       description: data.description,
  //       link: '/singers/' + key,
  //     })
  //   });
  // })
  const [dataSinger, setDataSinger] = useState<any[]>([]);

  useEffect(() => {
    const categorySongRef = ref(dbFirebase, "/singers/");

    const unsubscribe = onValue(categorySongRef, (items) => {
      const songs: any[] = [];
      items.forEach((item) => {
        const key = item.key;
        const data = item.val();

        songs.push({
          id: key,
          image: data.image,
          title: data.title,
          description: data.description,
          link: '/singers/' + key,
        });
      });

      setDataSinger(songs);
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <section className="">
        <div className="mb-[10px]">
          <Title text={"Danh Sách Ca Sĩ"} />
        </div>
        <div className="grid grid-cols-5 ">
          {dataSinger.map((item: any, index: number) => (
            <CategoryOutStanding key={index} item={item} />
          ))}

        </div>
      </section >
    </>
  )
}