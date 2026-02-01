import About from "@/components/about";
import Services from "@/components/services";
import AdvantagesWithImage from "@/components/advantages-with-image";
import Map from "@/components/map";
import Footer from "@/components/footer";
import AdminAccessButton from "@/components/admin-access-button";
import initDb from "@/db/client";
import {Data} from "@/types";

export default async  function Home() {
    const data: Data = {
        dataAbout: null,
        currentImages: null
    };

    try {
        const db = await initDb();
        const dataAbout = await db.all("SELECT * FROM about") || null;

        if (dataAbout && dataAbout.length > 0) {
            // Парсим achievements, если это JSON-строка
            try {
                dataAbout[0].achievements = JSON.parse(dataAbout[0].achievements);
            } catch (e) {
                console.warn("Failed to parse achievements as JSON", e);
            }
        }

        data.dataAbout = dataAbout[0];

        const response = await fetch('http://localhost:3082/api/admin/current-images');
        const result = await response.json();
        data.currentImages = result?.images || null;

    } catch (error) {
        console.error("Error fetching data from database:", error);
    }



  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 font-sans dark:bg-black">
        <About data={data}/>
        <Services />
        <AdvantagesWithImage />
        <Map />
        <Footer />
        <AdminAccessButton />
    </div>
  );
}
