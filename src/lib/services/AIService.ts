import openai from "@/lib/openai";

/**
 * AI Content Microservice (Abstraction)
 * This handles prompt orchestration and AI model communication.
 * Can be shifted to a dedicated backend easily.
 */
export class AIService {
    /**
     * Generate marketing text for a specific context
     */
    static async generateMarketingText(params: {
        topic: string;
        description: string;
        platform: string;
        brand: any;
    }) {
        const prompt = `
            You are an expert social media marketer for ${params.brand.industry}.
            Generate high-conversion content for a ${params.platform} post.
            Topic: ${params.topic}
            Context: ${params.description}
            Brand Tone: ${params.brand.tone}
            Brand Motto: ${params.brand.motto}
            
            Return a JSON object with:
            - headlines: 3 options (catchy, power-words)
            - captions: 3 options (scroll-stopping)
            - ctas: 2 options (direct action)
            - templateSuggestion: One of ['movie', 'event', 'product', 'fashion', 'sport']
            
            Strictly return ONLY JSON.
        `;

        try {
            const apiKey = process.env.OPENAI_API_KEY || "";
            const isOpenRouter = apiKey.startsWith("sk-or") || apiKey.includes("openrouter");
            const modelName = isOpenRouter ? "openai/gpt-4o" : "gpt-4o";

            const completion = await openai.chat.completions.create({
                model: modelName,
                messages: [{ role: "user", content: prompt }],
                response_format: { type: "json_object" },
                max_tokens: 1000,
            });

            const content = completion.choices[0]?.message?.content || "{}";

            // Extract JSON if it's wrapped in markdown code blocks
            const jsonMatch = content.match(/\{[\s\S]*\}/);
            const cleanContent = jsonMatch ? jsonMatch[0] : content;

            return JSON.parse(cleanContent);
        } catch (error) {
            console.error("AIService.generateMarketingText failed:", error);
            // Return safe fallback values to prevent 500
            return {
                headlines: [`${params.topic} - Quality First`, "Discover Our Latest", "Check this out!"],
                captions: [params.description, "Transforming your brand experience.", "Join us today!"],
                ctas: ["Learn More", "Get Started"],
                templateSuggestion: "product"
            };
        }
    }

    /**
     * Generate visual assets for the design
     */
    static async generateVisualAssets(params: {
        topic: string;
        platform: string;
        brand: any;
    }) {
        try {
            const apiKey = process.env.OPENAI_API_KEY || "";
            const isOpenRouter = apiKey.startsWith("sk-or") || apiKey.includes("openrouter");
            const imageModel = isOpenRouter ? "openai/dall-e-3" : "dall-e-3";

            const prompt = `A professional, high-end background for ${params.platform} about ${params.topic}. Industry: ${params.brand.industry}. Colors: ${params.brand.primaryColor}. Style: Ultra-modern, cinematic, minimalistic, 4k. No text.`;

            const response = await openai.images.generate({
                model: imageModel,
                prompt,
                n: 1,
                size: "1024x1024",
            });

            return response.data;
        } catch (error) {
            console.error("AIService.generateVisualAssets failed:", error);
            return []; // Fallback handled by caller
        }
    }
}
