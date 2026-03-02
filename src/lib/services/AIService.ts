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

        const completion = await openai.chat.completions.create({
            model: "openai/gpt-4o",
            messages: [{ role: "user", content: prompt }],
            response_format: { type: "json_object" },
            max_tokens: 1000,
        });

        return JSON.parse(completion.choices[0].message.content || "{}");
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
            const prompt = `A professional, high-end background for ${params.platform} about ${params.topic}. Industry: ${params.brand.industry}. Colors: ${params.brand.primaryColor}. Style: Ultra-modern, cinematic, minimalistic, 4k. No text.`;

            const response = await openai.images.generate({
                model: "dall-e-3",
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
