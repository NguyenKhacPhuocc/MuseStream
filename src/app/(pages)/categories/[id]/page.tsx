/* eslint-disable @typescript-eslint/no-explicit-any */
import CategoriesDetail from "@/app/components/CategoriesPage/CategoriesDetail";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Danh sách",
  description: "Nghe nhạc trực tuyến",
};

export default async function CategoryDetailPage(props: any) {
  const { id } = await props.params;

  return (
    <>
      <CategoriesDetail id={id} />
    </>
  );
}
