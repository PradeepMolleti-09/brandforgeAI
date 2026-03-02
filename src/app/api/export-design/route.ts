import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import cloudinary from "@/lib/cloudinary";
import Design from "@/models/Design";
import dbConnect from "@/lib/mongodb";

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        await dbConnect();
        const { designId, imageData, layoutJson, elementsJson, templateType } = await req.json();

        if (!designId || !imageData) {
            return NextResponse.json({ error: "Missing required data" }, { status: 400 });
        }

        // Upload high-res PNG to Cloudinary
        const uploadResponse = await cloudinary.uploader.upload(imageData, {
            folder: "brandforge_exports",
            resource_type: "image",
        });

        const finalImageUrl = uploadResponse.secure_url;

        // Update Design in DB with final image and current layout
        const design = await Design.findOneAndUpdate(
            { _id: designId, userId: (session.user as any).id },
            {
                $set: {
                    finalImageUrl,
                    layoutJson,
                    elementsJson, // Save current editable elements
                    templateType,
                    updatedAt: new Date()
                }
            },
            { new: true }
        );

        if (!design) {
            return NextResponse.json({ error: "Design not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, finalImageUrl, design });
    } catch (err: any) {
        console.error("Export Error:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
