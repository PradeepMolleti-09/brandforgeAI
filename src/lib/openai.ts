import OpenAI from "openai";

const apiKey = process.env.OPENAI_API_KEY;
const isOpenRouter = apiKey?.startsWith("sk-or") || apiKey?.includes("openrouter");

const openai = new OpenAI({
    apiKey: apiKey,
    baseURL: isOpenRouter ? "https://openrouter.ai/api/v1" : undefined,
    defaultHeaders: isOpenRouter ? {
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "BrandPost AI",
    } : undefined,
});

export default openai;
