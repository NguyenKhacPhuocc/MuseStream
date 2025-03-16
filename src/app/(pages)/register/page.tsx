import { Title } from "@/app/components/Title/Title";
import type { Metadata } from "next";
import { FormRegister } from "./FormRegister";

export const metadata: Metadata = {
  title: "Đăng ký",
  description: "Nghe nhạc trực tuyến",
};

export default function RegisterPage() {
  return (
    <>
      <section className="mt-[60px] flex flex-col items-center">
        <div className="">
          <Title text={"Đăng Ký Tài Khoản"} />
        </div>
        <FormRegister />
      </section>
    </>
  );
}
