import SongRankingPage from "@/app/components/SongRankingPage/SongRankingPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bảng xếp hạng",
  description: "Nghe nhạc trực tuyến",
};

export default function RankingPage() {

  return (
    <>
      <SongRankingPage />
    </>
  );
}
