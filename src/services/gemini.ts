import { GoogleGenAI } from "@google/genai";
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
if (!API_KEY) {
  throw new Error("مفتاح Gemini API مفقود. يرجى ضبط VITE_GEMINI_API_KEY.");
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
  const model: "gemini-1.5-flash";
  
  const prompt = `
    أنت نظام ذكاء اصطناعي متقدم متخصص في SEO التقني، وSEO داخل الصفحة، وتحسين مواقع الخدمات، وتدقيق هيكل HTML.
    دورك هو العمل كمستشار SEO أول، ومدقق تقني، ومحلل نية بحث.

    بيانات الإدخال:
    1. الكلمة المفتاحية الرئيسية: ${input.mainKeyword}
    2. نوع الخدمة: ${input.serviceType}
    3. المدينة أو الدولة المستهدفة: ${input.targetLocation}
    4. لغة الصفحة: ${input.language}
    5. رابط الصفحة: ${input.url || "غير محدد"}
    6. كود HTML الكامل:
    \`\`\`html
    ${input.html}
    \`\`\`

    الهدف:
    تحويل الصفحة إلى صفحة محسّنة تقنياً وعالية الجودة من ناحية SEO.
    قم بتحليل وتحسين الصفحة عبر طبقات متعددة: SEO التقني، SEO داخل الصفحة، الهيكل الدلالي لـ HTML، توافق نية البحث، تحسين SEO المحلي، هيكل المحتوى، الروابط الداخلية، البيانات المنظمة، وتحسين Core Web Vitals.

    تعليمات مهمة جداً:
    - يجب أن يكون الناتج بالكامل باللغة العربية فقط.
    - لا تستخدم أي كلمة إنجليزية في العناوين أو التسميات أو الشارات أو أي نص آخر.
    - حتى الكلمات التقنية مثل "warning" و"info" و"Technical SEO" يجب ترجمتها للعربية.
    - يجب أن يتبع الناتج الترتيب والهيكل المطلوب بالضبط.

    صيغة الناتج (بالترتيب التالي بالضبط):
    1. المشاكل المكتشفة في SEO
    2. المشاكل التقنية
    3. تحليل نية البحث
    4. تحسينات المحتوى
    5. توسيع الكلمات المفتاحية
    6. اقتراحات الروابط الداخلية
    7. البيانات المنظمة الموصى بها
    8. اقتراحات تحسين الأداء
    9. قسم Head المحسن

    القواعد:
    - لا تحذف محتوى مفيداً دون مبرر
    - تجنب حشو الكلمات المفتاحية
    - اتبع أفضل ممارسات Google في SEO
    - حسّن لمواقع الخدمات المحلية
    - حافظ على قابلية القراءة الطبيعية
    - تأكد من أن العناوين تتبع تسلسلاً منطقياً
    - اجعل التحسينات واقعية وعملية
    - أرجع الناتج بصيغة Markdown.
    - كل النص في الناتج يجب أن يكون عربياً 100% بدون أي استثناء.
  `;
  try {
    const response = await ai.models.generateContent({
      model,
      contents: [{ parts: [{ text: prompt }] }],
    });
    return response.text;
  } catch (error) {
    console.error("خطأ في Gemini API:", error);
    throw new Error("فشل تحليل SEO. يرجى التحقق من مفتاح API والبيانات المدخلة.");
  }
};
