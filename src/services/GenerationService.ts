import axios from "axios";

/**
 * Service for handling AI Generation tasks.
 * Centralizing AI logic for potential split into a standalone microservice.
 */
export class GenerationService {
    private static baseUrl = "/api/generate";

    static async generateVariation(topic: string, platform: string, brand?: any) {
        try {
            const response = await axios.post(this.baseUrl, {
                topic,
                platform,
                brand,
            });
            return response.data;
        } catch (error) {
            console.error("GenerationService.generateVariation failed:", error);
            throw error;
        }
    }

    /**
     * Future: Add magic-fill, background removal, etc.
     */
    static async backgroundRemoval(imageUrl: string) {
        // Mocking an external microservice call
        console.log("Calling external Background Removal Microservice for:", imageUrl);
        return { success: true, processedUrl: imageUrl };
    }
}
