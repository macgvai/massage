import {updateAbout} from "@/app/api/services/mainServices";

export async function POST(req: Request){

    try {
        const body = await req.json();
        const config = body.config;

        await updateAbout(config.about);
        return Response.json({
            message: "success"
        });
    } catch (error) {}
}