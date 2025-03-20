import React from 'react';
import { motion, Variants, Transition } from 'framer-motion';
import { FaCircleRight } from 'react-icons/fa6';

interface StartLayerProps {
  onStart: () => void;
}

const StartLayer: React.FC<StartLayerProps> = ({ onStart }) => {
  // Định nghĩa kiểu cho transition
  const floatTransition: Transition = {
    duration: 4,
    repeat: Infinity,
    repeatType: "loop" as const,
    ease: "easeInOut",
  };

  const floatTransition2: Transition = {
    duration: 5,
    repeat: Infinity,
    repeatType: "loop" as const,
    ease: "easeInOut",
  };

  const floatTransition3: Transition = {
    duration: 3,
    repeat: Infinity,
    repeatType: "loop" as const,
    ease: "easeInOut",
  };

  const floatTransition4: Transition = {
    duration: 6,
    repeat: Infinity,
    repeatType: "loop" as const,
    ease: "easeInOut",
  };

  const floatTransition5: Transition = {
    duration: 4.5,
    repeat: Infinity,
    repeatType: "loop" as const,
    ease: "easeInOut",
  };

  // Định nghĩa variants cho các quả cầu
  const floatVariants: Variants = {
    animate: {
      y: [0, -30, 0], // Chuyển động lên xuống
      transition: floatTransition,
    },
  };

  const floatVariants2: Variants = {
    animate: {
      x: ["-40%", "40%", "-40%"], // Chuyển động trái-phải với phạm vi rộng
      y: [0, -50, 0], // Kết hợp chuyển động lên xuống
      transition: floatTransition2,
    },
  };

  const floatVariants3: Variants = {
    animate: {
      y: [0, 100, 0], // Chuyển động lên xuống
      x: ["-30%", "30%", "-30%"], // Chuyển động trái-phải
      transition: floatTransition3,
    },
  };

  const floatVariants4: Variants = {
    animate: {
      x: ["-20%", "20%", "-20%"], // Chuyển động trái-phải
      y: ["-20%", "20%", "-20%"], // Chuyển động lên xuống
      rotate: [0, 360, 0], // Xoay vòng tròn
      transition: floatTransition4,
    },
  };

  const floatVariants5: Variants = {
    animate: {
      x: ["-50%", "50%", "-50%"], // Chuyển động trái-phải với phạm vi rộng
      y: ["-30%", "30%", "-30%"], // Chuyển động lên xuống lung tung
      transition: floatTransition5,
    },
  };

  // Định nghĩa variants cho hiệu ứng đung đưa của chữ
  const letterVariants: Variants = {
    initial: { y: 0 },
    animate: (i: number) => ({
      y: [0, -10, 0, 0, 0], // Đung đưa lên xuống
      transition: {
        duration: 1,
        repeat: Infinity,
        repeatType: "loop" as const,
        ease: "easeInOut",
        delay: i * 0.1,
      },
    }),
  };

  // Tách chuỗi "Welcome to MuseStream" thành mảng các chữ cái
  const text = "Welcome to MuseStream".split("");

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ x: "-100%", opacity: 0 }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{
        background: `radial-gradient(#00ADEF, #1C1C1C)`,
        boxShadow: "0 50px 50px rgba(0, 0, 0, 0.5)",
      }}
    >
      {/* Các phần tử 3D nổi - 5 quả cầu */}
      <motion.div
        className="absolute w-52 h-52 rounded-full"
        style={{
          background: `radial-gradient(circle, #00ADEF, #1C1C1C)`,
          boxShadow: "0 10px 20px rgba(0, 0, 0, 0.5)",
          top: "20%",
          left: "15%",
        }}
        variants={floatVariants}
        animate="animate"
      />
      <motion.div
        className="absolute w-24 h-24 rounded-full"
        style={{
          background: `radial-gradient(circle, #00ADEF, #212121)`,
          boxShadow: "0 15px 25px rgba(0, 0, 0, 0.6)",
          bottom: "25%",
          right: "20%",
        }}
        variants={floatVariants3}
        animate="animate"
      />
      <motion.div
        className="absolute w-52 h-52 rounded-full"
        style={{
          background: `radial-gradient(circle, #00ADEF, #292929)`,
          boxShadow: "0 8px 15px rgba(0, 0, 0, 0.4)",
          top: "10%",
          right: "10%",
        }}
        variants={floatVariants2}
        animate="animate"
      />
      <motion.div
        className="absolute w-32 h-32 rounded-full"
        style={{
          background: `radial-gradient(circle, #00ADEF, #1C1C1C)`,
          boxShadow: "0 12px 20px rgba(0, 0, 0, 0.5)",
          top: "40%",
          left: "30%",
        }}
        variants={floatVariants4}
        animate="animate"
      />
      <motion.div
        className="absolute w-28 h-28 rounded-full"
        style={{
          background: `radial-gradient(circle, #00ADEF, #212121)`,
          boxShadow: "0 10px 18px rgba(0, 0, 0, 0.5)",
          bottom: "15%",
          left: "10%",
        }}
        variants={floatVariants5}
        animate="animate"
      />

      {/* Nội dung chính */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 1 }}
        className="text-center z-10"
      >
        <h1 className="text-7xl text-black mb-[80px] font-bold flex justify-center">
          {text.map((letter, index) => (
            <motion.span
              key={index}
              variants={letterVariants}
              initial="initial"
              animate="animate"
              custom={index}
              className={letter === " " ? "w-4" : ""}
            >
              {letter}
            </motion.span>
          ))}
        </h1>
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0 5px 15px rgba(0, 173, 239, 0.5)" }}
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
          className="px-6 py-3 rounded-lg text-white transition text-[30px] font-bold duration-200 hover:cursor-pointer hover:bg-bg2 bg-black"
          style={{
            boxShadow: "0 5px 15px rgba(0, 0, 0, 0.5)",
          }}
        >
          <div className='flex justify-center items-center gap-[10px]'>
            Start
            <FaCircleRight />
          </div>
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default StartLayer;