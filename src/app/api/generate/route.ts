import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { AIService } from "@/lib/services/AIService";
import { DesignPersistenceService } from "@/lib/services/DesignPersistenceService";

/**
 * AI Generation Gateway (Service-Ready)
 */
export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { topic, description, platform, aspectRatio } = await req.json();
        const userId = (session.user as any).id;

        // 1. Fetch Brand Profile (DAO)
        const brand = await DesignPersistenceService.getUserBrand(userId);
        if (!brand) {
            return NextResponse.json({ error: "Brand profile not found." }, { status: 400 });
        }

        // 2. Generate Brand-Consistent Text (AI Microservice)
        const textContent = await AIService.generateMarketingText({
            topic,
            description,
            platform,
            brand
        });

        // 3. Generate Visual Assets (Media Microservice)
        let imageUrls = [
            "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1024",
            "https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=1024"
        ];

        try {
            const visualData = await AIService.generateVisualAssets({
                topic,
                platform,
                brand
            });
            const generatedUrls = (visualData || []).map((img: any) => img.url).filter(Boolean);
            if (generatedUrls.length > 0) imageUrls = generatedUrls;
        } catch (imgError) {
            console.warn("Visual generation failed, using fallbacks:", imgError);
        }

        const aiOutputJson = {
            ...textContent,
            imageUrls,
        };

        // 4. Persistence Service
        const design = await DesignPersistenceService.createDesign({
            userId,
            topic,
            description,
            platform,
            aspectRatio,
            aiOutputJson,
        });

        return NextResponse.json(design);
    } catch (error: any) {
        console.error("GENERATE SERVICE ERROR:", error);
        return NextResponse.json({
            error: error.message || "Internal Server Error",
        }, { status: 500 });
    }
}
