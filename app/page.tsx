export const dynamic = 'force-dynamic';
// export const revalidate = 60;
//
import About from "@/components/about";
import Services from "@/components/services";
import AdvantagesWithImage from "@/components/advantages-with-image";
import Map from "@/components/map";
import Footer from "@/components/footer";
import AdminAccessButton from "@/components/admin-access-button";
import {Data} from "@/types";
import {getAbout} from "@/app/api/services/mainServices";

export default async  function Home() {
    const data: Data = {
        dataAbout: null,
        currentImages: null
    };

    try {
        data.dataAbout = await getAbout();

        const response = await fetch('http://localhost:3082/api/admin/current-images');
        const result = await response.json();
        data.currentImages = result?.images || null;

    } catch (error) {
        console.error("Error fetching data from database:", error);
    }


    console.log('***********************************************************************************',data)

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
