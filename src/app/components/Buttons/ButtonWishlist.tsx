"use client";
import { authFirebase, dbFirebase } from "@/app/firebaseConfig";
import { ref, runTransaction } from "firebase/database";
import { useEffect, useState } from "react";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaHeart } from "react-icons/fa"

export const ButtonWishlist = (props: any) => {
  const { item, className } = props;
  const [isActive, setIsActive] = useState<boolean>(false);
  useEffect(() => {
    setIsActive(!!item.wishlist); // Đồng bộ trạng thái sau khi component được render trên client
  }, [item.wishlist]);

  const handleAddWishlist = () => {
    const userId = authFirebase?.currentUser?.uid;
    if (item.id && userId) {
      const songRef = ref(dbFirebase, `/songs/${item.id}`);

      runTransaction(songRef, (song) => {
        if (song) {
          if (song.wishlist && song.wishlist[userId]) {
            song.wishlist[userId] = null;
            setIsActive(false);
          } else {
            if (!song.wishlist) {
              song.wishlist = {};
            }
            song.wishlist[userId] = true;
            setIsActive(true);
          }
        }
        return song;
      });
    }
  }

  return (
    <>
      <button
        className={
          className
          + (isActive ? " bg-primary border-primary text-primary " : " border-white bg-bg2 text-white ")
        }
        onClick={handleAddWishlist}
      >
        <FaHeart />
      </button >

    </>
  )
}