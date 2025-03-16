"use client";
import { useState } from "react";
import { TiThMenu } from "react-icons/ti";

export const ButtonMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleOpenMenu = () => {
    const buttonOpenMenu = document.querySelector(".menu");
    if (buttonOpenMenu) {
      const buttonOpenMenu2 = buttonOpenMenu.querySelector(".menu");
      if (buttonOpenMenu2) {
        buttonOpenMenu.classList.toggle("open");
        buttonOpenMenu2.classList.toggle("open");
      }
      const isOpen = buttonOpenMenu.classList.contains("open");
      setIsMenuOpen(isOpen);
    }
  };

  return (
    <>
      <button
        className={`text-[34px] lg:mt-[20px] md:mt-[15px]  p-[8px] expand-menu hover:cursor-pointer   
          ${isMenuOpen ? "text-white" : "bg-bg2 rounded-[50%] text-primary"}   hover:bg-bg2 hover:rounded-[50%] hover:text-primary`}
        onClick={handleOpenMenu}
      >
        <TiThMenu />
      </button>
    </>
  );
};
