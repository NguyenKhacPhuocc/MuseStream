import SongDetail from "@/app/components/Song/SongDetail";
import type { Metadata } from "next";

// Định nghĩa kiểu cho params
interface SongDetailPageProps {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = {
  title: "Chi tiết bài hát",
  description: "Nghe nhạc trực tuyến",
};

export default async function SongDetailPage(props: SongDetailPageProps) {
  const params = await props.params; // Await params để lấy giá trị
  const { id } = params;
  return (
    <>
      <SongDetail id={id} />
    </>
  );
}