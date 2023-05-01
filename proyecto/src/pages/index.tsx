import Image from "next/image";
import { Inter } from "next/font/google";
import { Top } from "../root/components/header/Top";
import Empleado from "@/root/components/empleado/Empleado";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={` bg-PrimaryGreen flex min-h-screen flex-col items-center justify-between ${inter.className}`}>
      <header className = "bg-SecondaryGreen w-full h-auto">
        <Top />
      </header>
      <body>
        
      </body>
    </main>
  );
}
