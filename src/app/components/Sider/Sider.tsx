"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link"
import { IoMdHome } from "react-icons/io";
import { FaMusic, FaHeart, FaPodcast } from "react-icons/fa6";
import { FaRankingStar } from "react-icons/fa6";
import { FaSignOutAlt } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { FaUserPlus } from "react-icons/fa6";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { authFirebase } from "@/app/firebaseConfig";
import { ButtonMenu } from "../Buttons/ButtonMenu";

export const Sider = () => {

  const [isLogin, setIsLogin] = useState<boolean>();
  useEffect(() => {
    onAuthStateChanged(authFirebase, (user) => {
      if (user) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    })
  }, [])

  const menu = [
    {
      icon: <><IoMdHome /></>,
      title: "Trang chủ",
      link: "/",
    }, {
      icon: <><FaMusic /></>,
      title: "Danh mục bài hát",
      link: "/categories",
    }, {
      icon: <><FaPodcast /></>,
      title: "Ca sĩ",
      link: "/singers",
    }, {
      icon: <><FaRankingStar /></>,
      title: "Bảng xếp hạng",
      link: "/ranking",
    }, {
      icon: <><FaHeart /></>,
      title: "Bài hát yêu thích",
      link: "/wishlist",
      logged: true,
    }, {
      icon: <><FaSignOutAlt /></>,
      title: "Đăng xuất",
      link: "/logout",
      logged: true,
    }, {
      icon: <><FaUser /></>,
      title: "Đăng nhập",
      link: "/login",
      logged: false,
    }, {
      icon: <><FaUserPlus /></>,
      title: "Đăng ký",
      link: "/register",
      logged: false,
    },
  ]
  const pathname = usePathname();
  return (
    <>
      <div className="bg-bg2 text-white h-[100vh] fixed xl:w-[280px] lg:w-[240px] menu open">
        <div className="bg-bg3 lg:py-[22px] md:py-[16px] px-[20px]">
          <Link href={"/"} className="flex justify-start items-center gap-[12px] transition-transform transform hover:scale-110 hover:rotate-[-2deg]">
            <img
              src="/icon-logo.png"
              alt="logo"
              className="w-auto lg:h-[50px] md:h-[40px] h-[30px]"
            />
            <div
              className="text-primary lg:text-[24px] md:text-[18px] text-[12px] font-[700] leading-[28px] relative text-logo"
            >
              {/* Chữ MuseStream với hiệu ứng nền mờ */}
              <span className="absolute inset-0 blur-md text-primary opacity-50">MuseStream</span>
              <span className="relative z-10">MuseStream</span>
              {/* Icon sole */}
              {["🎵", "✨", "🎶", "🎧", "🎷"].map((icon, index) => (
                <span
                  key={index}
                  className="absolute text-yellow-400 text-base opacity-60 transition-opacity"
                  style={{
                    top: index % 2 === 0 ? `10px` : `-10px`, // Sole: icon chẵn ở dưới, lẻ ở trên
                    left: `${(index / 5) * 100 + (index % 2 === 0 ? 5 : -5)}%`, // Sole icon
                    transform: 'translateX(-50%)',
                    zIndex: 0,
                  }}
                >
                  {icon}
                </span>
              ))}
            </div>
          </Link>
        </div>
        <nav className="mt-[30px] px-[20px]">
          <ul className="">
            {menu
              .filter(item => (isLogin ? item.logged !== false : item.logged === false || item.logged === undefined)) // Lọc menu dựa trên trạng thái isLogin
              .map((item, index) => (
                <li className="mb-[20px] " key={index}>
                  <Link
                    href={item.link}
                    className={
                      "flex gap-[20px] items-center hover:text-primary transition-colors duration-200 py-[10px] " +
                      (pathname === item.link ? "  text-shadow-glow text-primary" : " text-white ")
                    }
                  >
                    <span className="text-[26px] icon-menu">
                      {item.icon}
                    </span>
                    <span className="font-[700] text-[16px]  leading-[20px] title-menu line-clamp-1">
                      {item.title}
                    </span>
                  </Link>
                </li>
              ))}
          </ul>
        </nav>
        <div className="absolute bottom-0 right-0 expand-menu">
          <ButtonMenu />
        </div>
      </div>
    </>
  )
}