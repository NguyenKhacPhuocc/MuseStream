import { CategoriesPage } from "@/app/components/CategoriesPage/CategoriesPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Danh mục bài hát",
  description: "Nghe nhạc trực tuyến",
};

export default function CategoryPage() {

  return (
    <>
      <CategoriesPage />
    </>
  );
}
