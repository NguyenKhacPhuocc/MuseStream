"use client";

import { Title } from "../Title/Title";
import { get, ref } from "firebase/database";
import { CategoryOutStanding } from "../CategoryOutStanding/CategoryOutStanding";
import { dbFirebase } from "@/app/firebaseConfig";
import { useState, useEffect } from "react";
import { FaRegCircleRight } from "react-icons/fa6"
import Link from "next/link";
import Skeleton from "react-loading-skeleton";

interface Category {
  id: string;
  image: string;
  title: string;
  description: string;
  link: string;
}

export const Section2HomePage = () => {
  const [data2, setData2] = useState<Category[]>([]);
  const [isLg, setIsLg] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Theo dõi kích thước màn hình
    const handleResize = () => {
      setIsLg(window.innerWidth >= 768 && window.innerWidth < 1280); // Chỉ là `lg`
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Gọi lần đầu tiên để thiết lập đúng giá trị

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const categoryRef = ref(dbFirebase, "categories");

    // Sử dụng `get` để lấy dữ liệu một lần
    get(categoryRef).then((snapshot) => {
      if (snapshot.exists()) {
        const newData: Category[] = [];
        snapshot.forEach((item) => {
          if (newData.length < 5) {
            newData.push({
              id: item.key!,
              image: item.val().image,
              title: item.val().title,
              description: item.val().description,
              link: "/categories/" + item.key,
            });
          }
        });
        setData2(newData);
      } else {
        console.log("No data available");
      }
      setLoading(false);
    }).catch((error) => {
      console.error("Error fetching categories:", error);
      setLoading(false);
    });
  }, []);

  return (
    <section className="xl:mb-[30px] md:mb-[20px] sm:mb-[10px]">
      <div className="xl:mb-[10px] lg:mb-[5px]">
        <Title text={"Danh Mục Nổi Bật"} />
      </div>
      {loading ? (
        <div className="grid xl:grid-cols-5 md:grid-cols-4 gap-[10px]">
          {Array(5).fill("").slice(0, isLg ? 4 : 5).map((_, index) => (
            <div key={index} className="relative group">
              <div className="p-[10px] rounded-[12px] bg-bg2 animate-pulse gap-[10px]">
                <Skeleton
                  containerClassName="w-[100%] aspect-[1/1] rounded-[10px] bg-bg1 opacity-30"
                  className="w-[100%] aspect-[1/1] rounded-[10px] bg-bg1 opacity-30" />
                <Skeleton
                  containerClassName="w-full opacity-30 rounded-[10px]"
                  className="mt-[10px] w-full bg-bg1 opacity-30 rounded-[10px]"
                />
                <Skeleton
                  containerClassName="w-full opacity-30 rounded-[10px]"
                  className="w-full bg-bg1 opacity-30 rounded-[10px]"
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid xl:grid-cols-5 md:grid-cols-4 ">
          {data2.slice(0, isLg ? 4 : 5).map((item, index) => (
            <div key={index} className="relative group">
              <CategoryOutStanding item={item} />
              {index === data2.slice(0, isLg ? 4 : 5).length - 1 && (
                <Link href={"/categories"} className="invisible group-hover:visible group-hover:flex flex-col absolute bottom-0 left-0 w-full h-full bg-[#5f718b]/40 justify-center items-center z-10 rounded-[15px]">
                  <span className="text-white text-[20px] font-[700]">
                    Xem thêm
                  </span>
                  <span className="text-[40px] text-[#ffffff] font-semibold bg-primary rounded-[50%] opacity-85">
                    <FaRegCircleRight />
                  </span>
                </Link>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

