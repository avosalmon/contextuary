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
      className={`flex h-screen flex-col ${inter.variable} ${inter.className}`}
    >
      <div className="container mx-auto px-4 py-8">
        <div className="rounded bg-white p-6 shadow">{children}</div>
      </div>
    </div>
  );
}
