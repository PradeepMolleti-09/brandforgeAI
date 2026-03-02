import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectToDatabase from "@/lib/mongodb";
import Design from "@/models/Design";
import Brand from "@/models/Brand";

export async function GET(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        await connectToDatabase();

        if (id && id.length === 24) { // Basic MongoDB ObjectId validation
            const design = await Design.findById(id).lean();
            if (!design) return NextResponse.json({ error: "Not found" }, { status: 404 });

            const brand = await Brand.findOne({ userId: (session.user as any).id }).lean();
            return NextResponse.json({ ...design, brand });
        } else if (id === 'new') {
            // Handle fresh editor instance
            const brand = await Brand.findOne({ userId: (session.user as any).id }).lean();
            return NextResponse.json({ topic: "New Design", brand });
        }

        const designs = await Design.find({ userId: (session.user as any).id }).sort({ createdAt: -1 });
        return NextResponse.json(designs);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PATCH(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id, finalImageUrl } = await req.json();
        await connectToDatabase();

        const design = await Design.findByIdAndUpdate(id, { finalImageUrl }, { new: true });
        return NextResponse.json(design);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
