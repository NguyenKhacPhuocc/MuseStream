"use client";

import { useState } from "react";
import { Suspense } from "react";
import { SongProvider } from "../Context/SongContext";
import StartLayer from "./StartLayer";
import { Alart } from "../Alart/Alart";
import { Sider } from "../Sider/Sider";
import { Search } from "../Search/Search";
import { Play } from "../Play/Play";
import { AnimatePresence, motion } from "framer-motion"; // Thêm motion để tạo hiệu ứng cho nội dung chính

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showStartLayer, setShowStartLayer] = useState(true);

  const handleStart = () => {
    setShowStartLayer(false);
  };

  return (
    <SongProvider>
      <AnimatePresence>
        {showStartLayer && <StartLayer onStart={handleStart} />}
      </AnimatePresence>
      {!showStartLayer && (
        <motion.div
          initial={{ x: "100%", opacity: 0 }} // Bắt đầu từ bên phải, mờ
          animate={{ x: 0, opacity: 1 }} // Trượt vào từ bên phải, hiện rõ
          transition={{ duration: 1.2, ease: "easeInOut" }} // Đồng bộ thời gian với StartLayer
        >
          <Alart />
          <div className="mx-auto">
            <div className="flex items-start">
              <div className="xl:w-[280px] lg:w-[240px] z-20 lg:block menu open">
                <Sider />
              </div>
              <div className="flex-1 relative mx-[3%]">
                <Suspense>
                  <Search />
                </Suspense>
                <main className="xl:mt-[30px] xl:mb-[120px] lg:mt-[25px] lg:mb-[100px] md:mt-[20px] md:mb-[80px] sm:mt-[15px] sm:mb-[60px] min-h-screen mx-[5.2%]">
                  {children}
                </main>
              </div>
            </div>
          </div>
          <Play />
        </motion.div>
      )}
    </SongProvider>
  );
}