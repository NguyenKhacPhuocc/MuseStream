import { Title } from "@/app/components/Title/Title";
import type { Metadata } from "next";
import { Section1 } from "./Section1";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Tìm kiếm",
  description: "Nghe nhạc trực tuyến",
};

export default function SearchPage() {
  return (
    <>
      <section className="">
        <Title text={"Kết Quả Tìm Kiếm"} />
        <div className="">
          <Suspense>
            <Section1 />
          </Suspense>
        </div>
      </section>

    </>
  );
}
