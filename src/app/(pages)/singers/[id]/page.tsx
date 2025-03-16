/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Metadata } from "next";
import SingersDetail from "@/app/components/SingersPage/SingersDetail";

export const metadata: Metadata = {
  title: "Chi tiết ca sĩ",
  description: "Nghe nhạc trực tuyến",
};

export default async function SingerDetailPage(props: any) {
  const { id } = await props.params;

  return (
    <>
      <SingersDetail id={id}/>
    </>
  );
}
