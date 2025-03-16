import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 Not Found",
  description: "Không tìm thấy trang này",
};

export default function NotFoundPage() {
  return (
    <>
      <h1 className="text-[32px] font-[700] text-center mt-[50px] text-white">
        404 Not Found
      </h1>
      <div className="text-center mt-[20px]">
        <Link href={"/"} className="bg-white text-black font-[700] p-[10px]">
          Trở về trang chủ
        </Link>
      </div>
    </>
  )
}