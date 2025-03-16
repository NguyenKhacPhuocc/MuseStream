/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Title } from "../Title/Title";
import { onValue, ref } from "firebase/database";
import { CategoryOutStanding } from "../CategoryOutStanding/CategoryOutStanding";
import { dbFirebase } from "@/app/firebaseConfig";
import { useEffect, useState } from "react";

// interface CategorySong {
//   id: string,
//   image: string,
//   title: string,
//   description: string,
//   link: string,
// }

export const CategoriesPage = () => {

  const [categorySong, setCategorySong] = useState<any[]>([]);

  useEffect(() => {
    const categorySongRef = ref(dbFirebase, "/categories/");

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
          link: "/categories/" + key,
        });
      });

      setCategorySong(songs);
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <section className="mb-[30px]">
        <div className="mb-[10px]">
          <Title text={"Danh Mục Bài Hát"} />
        </div>
        <div className="grid grid-cols-5">
          {categorySong.map((item: any, index: number) => (
            <CategoryOutStanding key={index} item={item} />
          ))}

        </div>
      </section>
    </>
  )
}