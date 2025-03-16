import { SingersPage } from "@/app/components/SingersPage/SingersPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Danh sách ca sĩ",
  description: "Nghe nhạc trực tuyến",
};

export default function SingerPage() {

  return (
    <>
      <SingersPage />
    </>
  );
}
