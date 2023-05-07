import { PropsWithChildren } from "react";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export default function Layout({ children }: PropsWithChildren<{}>) {
  return (
    <div
      className={`flex min-h-screen flex-col items-center justify-between ${inter.variable} ${inter.className}`}
    >
      {children}
    </div>
  );
}
