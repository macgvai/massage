'use client'
import About from "@/components/about";
import Services from "@/components/services";
import AdvantagesWithImage from "@/components/advantages-with-image";
import Map from "@/components/map";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 font-sans dark:bg-black">
        <About />
        <Services />
        <AdvantagesWithImage />
        <Map />
        <Footer />
    </div>
  );
}
