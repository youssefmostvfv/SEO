import React, { useState } from 'react';
import { Search, MapPin, Globe, Code, Briefcase, Link as LinkIcon } from 'lucide-react';
import { SEOInput } from '../services/gemini';

interface SEOFormProps {
  onSubmit: (data: SEOInput) => void;
  isLoading: boolean;
}

export const SEOForm: React.FC<SEOFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<SEOInput>({
    mainKeyword: '',
    serviceType: '',
    targetLocation: '',
    language: 'Arabic',
    url: '',
    html: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm" dir="rtl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-right">
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-2 justify-end">
            الكلمة المفتاحية الرئيسية <Search size={14} />
          </label>
          <input
            required
            name="mainKeyword"
            value={formData.mainKeyword}
            onChange={handleChange}
            placeholder="مثال: خدمات نقل العفش"
            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-right"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-2 justify-end">
            نوع الخدمة <Briefcase size={14} />
          </label>
          <input
            required
            name="serviceType"
            value={formData.serviceType}
            onChange={handleChange}
            placeholder="مثال: نقل محلي"
            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-right"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-2 justify-end">
            المدينة أو الدولة المستهدفة <MapPin size={14} />
          </label>
          <input
            required
            name="targetLocation"
            value={formData.targetLocation}
            onChange={handleChange}
            placeholder="مثال: الرياض، السعودية"
            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-right"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-2 justify-end">
            لغة الصفحة <Globe size={14} />
          </label>
          <select
            name="language"
            value={formData.language}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white text-right"
          >
            <option>Arabic</option>
            <option>English</option>
            <option>Spanish</option>
            <option>French</option>
            <option>German</option>
            <option>Portuguese</option>
          </select>
        </div>

        <div className="md:col-span-2 space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-2 justify-end">
            رابط الصفحة (اختياري) <LinkIcon size={14} />
          </label>
          <input
            name="url"
            value={formData.url}
            onChange={handleChange}
            placeholder="https://example.com/service"
            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-left dir-ltr"
          />
        </div>

        <div className="md:col-span-2 space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-2 justify-end">
            كود HTML الكامل للصفحة <Code size={14} />
          </label>
          <textarea
            required
            name="html"
            value={formData.html}
            onChange={handleChange}
            placeholder="قم بلصق كود HTML هنا..."
            rows={8}
            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all font-mono text-sm text-left dir-ltr"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-slate-900 text-white py-4 rounded-xl font-semibold hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            جاري تحليل SEO التقني...
          </>
        ) : (
          'تشغيل فحص SEO الكامل'
        )}
      </button>
    </form>
  );
};
