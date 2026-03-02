import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const { image } = await req.json(); // base64 image

        if (!image) {
            return NextResponse.json({ error: "No image data" }, { status: 400 });
        }

        const uploadResponse = await cloudinary.uploader.upload(image, {
            folder: "brandforge_uploads",
        });

        return NextResponse.json({ url: uploadResponse.secure_url });
    } catch (err: any) {
        console.error("Upload Error:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
