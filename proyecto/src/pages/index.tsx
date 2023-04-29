import Image from "next/image";
import { Inter } from "next/font/google";
import { Header } from "../root/components/header/Header";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={` bg-PrimaryGreen flex min-h-screen flex-col items-center justify-between ${inter.className}`}>
      <header className = "bg-SecundaryGreen w-full">
        <Header />
      </header>
    </main>
  );
}
