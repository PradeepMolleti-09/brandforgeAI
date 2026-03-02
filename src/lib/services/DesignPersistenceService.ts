import connectToDatabase from "@/lib/mongodb";
import Design from "@/models/Design";
import Brand from "@/models/Brand";

/**
 * Design Persistence Service (Micro-DAO)
 * Responsible for all database interactions for the design module.
 */
export class DesignPersistenceService {
    static async getUserBrand(userId: string) {
        await connectToDatabase();
        return await Brand.findOne({ userId });
    }

    static async getDesignById(id: string, userId: string) {
        await connectToDatabase();
        return await Design.findOne({ _id: id, userId });
    }

    static async createDesign(params: {
        userId: string;
        topic: string;
        description: string;
        platform: string;
        aspectRatio: string;
        aiOutputJson: any;
    }) {
        await connectToDatabase();
        const design = await Design.create(params);
        return design;
    }

    static async getUserDesigns(userId: string) {
        await connectToDatabase();
        return await Design.find({ userId }).sort({ createdAt: -1 });
    }

    static async updateDesign(id: string, userId: string, updates: any) {
        await connectToDatabase();
        return await Design.findOneAndUpdate(
            { _id: id, userId },
            { $set: updates },
            { new: true }
        );
    }
}
