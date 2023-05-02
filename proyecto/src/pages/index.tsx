import Image from "next/image";
import { Inter } from "next/font/google";
import { Top } from "../root/components/header/Top";
import { MainForm } from "../root/components/mainForm/MainForm";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={`bg-PrimaryGreen flex flex-col items-center justify-center h-screen`}>
      <header className="bg-SecondaryGreen w-full h-20">
        <Top />
      </header>
      <section className="w-full h-full flex flex-col items-center justify-center">
        <MainForm/>
      </section>
    </main>
  );
}