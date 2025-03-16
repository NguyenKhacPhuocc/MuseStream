"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { SongItem2 } from "@/app/components/Song/SongItem2";
import { Title } from "@/app/components/Title/Title";
import { authFirebase, dbFirebase } from "@/app/firebaseConfig";
import { onValue, ref } from "firebase/database";

export default function SongSameCategory(props: any) {
  const { idSong, idCategory } = props;
  const userId: any = authFirebase?.currentUser?.uid;
  const [dataSong, setDataSong] = useState<any[]>([]); // State để lưu danh sách bài hát

  useEffect(() => {
    const fetchData = async () => {
      const tempSongs: any[] = [];
      onValue(ref(dbFirebase, "songs"), (items) => {
        items.forEach((item) => {
          const key = item.key;
          const data = item.val();
          const listNameSinger: any[] = [];

          if (data.categoryId === idCategory && key !== idSong) {
            // Lấy thông tin ca sĩ
            for (let index = 0; index < data.singerId.length; index++) {
              const element = data.singerId[index];
              onValue(ref(dbFirebase, "/singers/" + element), (item) => {
                listNameSinger.push(item.val().title);
              });
            }

            tempSongs.push({
              id: key,
              title: data.title,
              image: data.image,
              singers: listNameSinger.join(", "),
              listen: data.listen,
              wishlist: data.wishlist ? data.wishlist[userId] : false,
              link: "/songs/" + key,
              audio: data.audio,
            });
          }
        });

        // Cập nhật state sau khi xử lý xong dữ liệu
        setDataSong(tempSongs);
      });
    };

    fetchData();
  }, [idSong, idCategory, userId]); // Chạy lại khi các phụ thuộc thay đổi

  return (
    <>
      <section className="">
        <Title text={"Bài Hát Cùng Danh Mục"} />
        {dataSong.map((item: any, index: number) => (
          <SongItem2 key={index} item={item} />
        ))}
      </section>
    </>
  );
}
