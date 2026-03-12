export const dynamic = 'force-dynamic';
// export const revalidate = 60;
//
import About from "@/components/about";
import Services from "@/components/services";
import AdvantagesWithImage from "@/components/advantages-with-image";
import Map from "@/components/map";
import Footer from "@/components/footer";
import AdminAccessButton from "@/components/admin-access-button";
import JsonLd from "@/components/JsonLd";
import { Data } from "@/types";
import { getAbout, getSiteConfig } from "@/app/api/services/mainServices";

export default async  function Home() {
    const data: Data = {
        dataAbout: null,
        siteConfig: null,
        currentImages: null
    };

    try {
        const [about, siteConfig] = await Promise.all([
            getAbout(),
            getSiteConfig(),
        ]);

        data.dataAbout = about;
        data.siteConfig = siteConfig;
        data.currentImages = siteConfig.images; // Изображения теперь в конфигурации
    } catch (error) {
        console.error("Error fetching data from database:", error);
    }

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 font-sans dark:bg-black">
        {data.siteConfig && <JsonLd siteConfig={data.siteConfig} />}
        <About data={data}/>
        {data.siteConfig && (
            <>
                <Services siteConfig={data.siteConfig} />
                <AdvantagesWithImage
                    siteConfig={data.siteConfig}
                    currentImages={data.currentImages}
                />
                <Map siteConfig={data.siteConfig} />
                <Footer siteConfig={data.siteConfig} />
            </>
        )}
        <AdminAccessButton />
    </div>
  );
}
