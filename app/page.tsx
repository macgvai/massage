export const dynamic = 'force-dynamic';
// export const revalidate = 60;
//
import About from "@/components/about";
import Services from "@/components/services";
import AdvantagesWithImage from "@/components/advantages-with-image";
import Map from "@/components/map";
import Footer from "@/components/footer";
import AdminAccessButton from "@/components/admin-access-button";
import {SiteConfig} from "@/types";
import { getSiteConfig } from "@/app/api/services/mainServices";

export default async  function Home() {
    let siteConfig: SiteConfig | null = null;
    try {
        siteConfig = await getSiteConfig();
    } catch (error) {
        console.error("Error fetching data from database:", error);
    }

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 font-sans dark:bg-black">
        {siteConfig && (
            <>
                <About siteConfig={siteConfig}/>
                <Services siteConfig={siteConfig} />
                <AdvantagesWithImage siteConfig={siteConfig}/>
                <Map siteConfig={siteConfig} />
                <Footer siteConfig={siteConfig} />
            </>
        )}
        <AdminAccessButton />
    </div>
  );
}
