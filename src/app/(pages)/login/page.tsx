import { Title } from "@/app/components/Title/Title";
import type { Metadata } from "next";
import { FormLogin } from "./FormLogin";

export const metadata: Metadata = {
  title: "Đăng nhập",
  description: "Nghe nhạc trực tuyến",
};

export default function LoginPage() {
  return (
    <>
      <section className="mt-[60px] flex flex-col items-center">
        <div className="">
          <Title text={"Đăng Nhập Tài Khoản"} />
        </div>
        <FormLogin />
      </section>
    </>
  );
}
