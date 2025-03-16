"use client"
import { authFirebase } from "@/app/firebaseConfig";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LogoutPage() {

  const router = useRouter();
  useEffect(() => {
    signOut(authFirebase).then(() => {
      const alartLogin = document.querySelector(".alart");
      if (alartLogin) {
        const textAlartLogin = document.querySelector(".text-alart");
        if (textAlartLogin) {
          textAlartLogin.innerHTML = `Đăng xuất`;
          alartLogin.classList.remove("hidden");
          setTimeout(() => {
            alartLogin.classList.add("hidden");
          }, 3000);
        }
      }
      router.push("/login");
    }).catch((error) => {
      console.log(error);
    })
  }, [])
  return (
    <></>
  );
}
