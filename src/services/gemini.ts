import { GoogleGenAI } from "@google/genai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error("Gemini API key is missing. Please configure VITE_GEMINI_API_KEY.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export interface SEOInput {
  mainKeyword: string;
  serviceType: string;
  targetLocation: string;
  language: string;
  url?: string;
  html: string;
}

export const analyzeSEO = async (input: SEOInput) => {
  const model = "gemini-3.1-pro-preview";
  
  const prompt = `
    You are an advanced AI system specialized in Technical SEO, On-Page SEO, Service Website Optimization, and HTML structure auditing.
    Your role is to act as a senior SEO consultant, technical auditor, and search intent analyst.

    INPUT DATA:
    1. Main Keyword: ${input.mainKeyword}
    2. Service Type: ${input.serviceType}
    3. Target City or Country: ${input.targetLocation}
    4. Page Language: ${input.language}
    5. Page URL: ${input.url || "Not provided"}
    6. Full HTML code:
    \`\`\`html
    ${input.html}
    \`\`\`

    OBJECTIVE:
    Transform the page into a technically perfect and highly optimized SEO page.
    Analyze and improve the page across multiple layers: Technical SEO, On-Page SEO, HTML semantic structure, Search intent alignment, Local SEO optimization, Content structure, Internal linking, Structured data, and Core Web Vitals optimization.

    IMPORTANT:
    The output MUST be 100% in Arabic language. 
All section titles, labels, badges, card headings, and ALL text must be in Arabic only. 
Do NOT use any English words anywhere in the output.
    The output MUST follow the exact order and structure requested.

    OUTPUT FORMAT:
    Produce the result in this exact order:
    1. SEO Issues Found (المشاكل المكتشفة في SEO)
    2. Technical SEO Problems (المشاكل التقنية)
    3. Search Intent Analysis (تحليل نية البحث)
    4. Content Improvements (تحسينات المحتوى)
    5. Keyword Expansion (توسيع الكلمات المفتاحية)
    6. Internal Linking Suggestions (اقتراحات الروابط الداخلية)
    7. Recommended Structured Data (البيانات المنظمة الموصى بها)
    8. Performance Optimization Suggestions (اقتراحات تحسين الأداء)
    9. Optimized HTML Head Section (قسم Head المحسن)

    RULES:
    - Never remove useful content without justification
    - Avoid keyword stuffing
    - Follow Google SEO best practices
    - Optimize for local service websites
    - Maintain natural language readability
    - Ensure headings follow logical hierarchy
    - Keep improvements realistic and practical
    - Return the output in Markdown format.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: [{ parts: [{ text: prompt }] }],
    });

    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to analyze SEO. Please check your API key and input.");
  }
};
