import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "./components/StartLayer/ClientLayout";

export const metadata: Metadata = {
  title: "MuseStream",
  description: "Nghe nhạc trực tuyến",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-bg1">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}