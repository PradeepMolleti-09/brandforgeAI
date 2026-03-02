
const axios = require('axios');
require('dotenv').config({ path: '.env.local' });

async function testAIService() {
    const apiKey = process.env.OPENAI_API_KEY;
    const url = "https://openrouter.ai/api/v1/chat/completions";
    
    const prompt = `
        You are an expert social media marketer.
        Generate high-conversion content for a Instagram post.
        Topic: Coffee Shop
        Context: Grand opening
        Brand Tone: Friendly
        Brand Motto: Fresh beans daily
        
        Return a JSON object with:
        - headlines: 3 options (catchy, power-words)
        - captions: 3 options (scroll-stopping)
        - ctas: 2 options (direct action)
        - templateSuggestion: One of ['movie', 'event', 'product', 'fashion', 'sport']
        
        Strictly return ONLY JSON.
    `;

    try {
        const response = await axios.post(url, {
            model: "openai/gpt-4o",
            messages: [{ role: "user", content: prompt }],
            response_format: { type: "json_object" },
            max_tokens: 1000,
        }, {
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "HTTP-Referer": "http://localhost:3000",
                "X-Title": "BrandPost AI",
            }
        });

        console.log("Response:", JSON.stringify(response.data, null, 2));
    } catch (error) {
        console.error("Error:", error.response?.data || error.message);
    }
}

testAIService();
