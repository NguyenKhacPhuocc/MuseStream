"use client";
import { dbFirebase } from "@/app/firebaseConfig";
import { get, onValue, ref } from "firebase/database";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { SongItemSearch } from "../Song/SongItemSearch";

export const Search = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSearchActive, setIsSearchActive] = useState(false); // Trạng thái hiển thị kết quả
  const [dataFinal, setDataFinal] = useState<any[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const formRef = useRef<HTMLFormElement | null>(null); // Tham chiếu đến form

  const handleSearch = (event: any) => {
    event.preventDefault();
    const key = event.target.key.value;
    router.push(`/search?key=${key}`);
  };
  const defaultKey = searchParams.get("key") || "";

  const handleSearchChange = (event: any) => {
    const Value = event.target.value.trim();
    const searchState = document.querySelector(".SearchState");
    setSearchValue(Value);
    if (dataFinal.length > 0 && Value !== "") {
      if (searchState) {
        searchState.classList.add("active");
        searchState.classList.remove("noActive");
        setIsSearchActive(true);
      }
    } else if (Value === "") {
      if (searchState) {
        searchState.classList.add("noActive");
        searchState.classList.remove("active");
        setIsSearchActive(false);
      }
    }
  }

  const handleClickOutside = (event: any) => {
    if (formRef.current && !formRef.current.contains(event.target)) {
      setIsSearchActive(false); // Ẩn kết quả khi click ra ngoài
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const dataSearchSong: any[] = [];
    const fetchData = async () => {
      const items = await get(ref(dbFirebase, "songs"));
      items.forEach((item: any) => {
        const key = item.key;
        const data = item.val();
        if (data.title.toLowerCase().includes(searchValue.toLowerCase())) {
          const listNameSinger: any = [];
          for (let index = 0; index < data.singerId.length; index++) {
            const element = data.singerId[index];
            onValue(ref(dbFirebase, "/singers/" + element), (item) => {
              listNameSinger.push(item.val().title);
            });
          }

          dataSearchSong.push({
            id: key,
            image: data.image,
            title: data.title,
            singers: listNameSinger.join(", "),
            time: "4:32",
            link: "/songs/" + key,
          });
        }
      });
      setDataFinal(dataSearchSong);
    };
    fetchData();
  }, [searchValue]);



  return (
    <form
      ref={formRef}
      className="bg-[#212121] rounded-[50px] lg:mt-[20px] md:mt-[15px] py-[16px] lg:px-[30px] md:px-[20px]   sticky top-[20px] left-[20px] text-white flex items-center z-10 flex-1"
      onSubmit={handleSearch}
    >
      <label htmlFor="search" className=" lg:text-[22px] md:text-[20px] pr-[20px] cursor-pointer">
        <FaSearch />
      </label>
      <input
        id="search"
        name="key"
        type="text"
        defaultValue={defaultKey}
        placeholder="Tìm kiếm..."
        className="bg-transparent lg:text-[16px] md:text-[14px] font-[500] leading-[20px] outline-none flex-1"
        onChange={handleSearchChange}
        onFocus={() => setIsSearchActive(true)} // Hiển thị kết quả khi focus
      />
      {isSearchActive && (
        <div className="bg-bg2 absolute top-[20px] pt-[54px] z-[-1] w-[100%] opacity-80 mx-[-30px] mt-[-20px] rounded-t-[50px] rounded-b-[25px] px-[20px] py-[10px] text-white SearchState">
          <div className="border-t border-[#494949] max-h-[350px] overflow-y-auto">
            {dataFinal.length > 0 ? (
              dataFinal.map((item, index) => (
                <SongItemSearch
                  item={item}
                  key={index}
                />
              ))
            ) : (
              <div className="mt-[10px]">Không tìm thấy</div>
            )}
          </div>
        </div>
      )}
    </form>
  );
};
