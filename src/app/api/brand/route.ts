import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Brand from "@/models/Brand";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await connectToDatabase();
        const brand = await Brand.findOne({ userId: (session.user as any).id });

        return NextResponse.json(brand || {});
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const data = await req.json();
        await connectToDatabase();

        const brand = await Brand.findOneAndUpdate(
            { userId: (session.user as any).id },
            { ...data, userId: (session.user as any).id },
            { upsert: true, new: true }
        );

        return NextResponse.json(brand);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
