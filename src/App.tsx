import React, { useState } from 'react';
import { Layout, Shield, Zap, BarChart3, Info, AlertTriangle } from 'lucide-react';
import { SEOForm } from './components/SEOForm';
import { AuditResults } from './components/AuditResults';
import { analyzeSEO, SEOInput } from './services/gemini';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAudit = async (data: SEOInput) => {
    setIsLoading(true);
    setError(null);
    setResults(null);
    try {
      const analysis = await analyzeSEO(data);
      setResults(analysis);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'حدث خطأ غير متوقع');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20" dir="rtl">
      {/* الهيدر */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
              <BarChart3 className="text-white" size={18} />
            </div>
            <span className="font-bold text-slate-900 tracking-tight">مدقق SEO الاحترافي</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-sm font-medium text-slate-600 hover:text-slate-900">التوثيق</a>
            <a href="#" className="text-sm font-medium text-slate-600 hover:text-slate-900">أفضل الممارسات</a>
            <div className="h-4 w-px bg-slate-200" />
            <span className="text-xs font-mono text-slate-400">v1.2.0</span>
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 pt-12">
        <div className="mb-12 text-right">
          <motion.h1
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl font-bold text-slate-900 tracking-tight"
          >
            مدقق SEO التقني
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-500 mt-2 text-lg"
          >
            تحليل صفحات المواقع الخدمية من حيث نية البحث، الصحة التقنية، والتحسين المحلي.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* منطقة الفورم */}
          <div className="lg:col-span-2">
            <SEOForm onSubmit={handleAudit} isLoading={isLoading} />

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3 text-red-700 text-right"
                >
                  <AlertTriangle className="shrink-0" size={20} />
                  <p className="text-sm font-medium">{error}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {results && <AuditResults results={results} />}
          </div>

          {/* الشريط الجانبي */}
          <div className="space-y-6 text-right">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4 flex items-center gap-2 justify-end">
                نطاق الفحص <Info size={14} />
              </h3>
              <ul className="space-y-4">
                <li className="flex gap-3 justify-end">
                  <span className="text-sm text-slate-600">التحقق من الهيكل التقني وHTML الدلالي</span>
                  <Shield className="text-blue-500 shrink-0" size={18} />
                </li>
                <li className="flex gap-3 justify-end">
                  <span className="text-sm text-slate-600">تحسين مؤشرات أداء الويب الحيوية</span>
                  <Zap className="text-amber-500 shrink-0" size={18} />
                </li>
                <li className="flex gap-3 justify-end">
                  <span className="text-sm text-slate-600">تحسين SEO المحلي وتوافق نية البحث</span>
                  <BarChart3 className="text-emerald-500 shrink-0" size={18} />
                </li>
              </ul>
            </div>

            <div className="bg-slate-900 p-6 rounded-2xl text-white">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">نصيحة احترافية</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                للحصول على أفضل النتائج، قم بلصق كود المصدر الكامل (Ctrl+U) بما في ذلك قسم head. يتيح ذلك للذكاء الاصطناعي تحليل الميتا تاق والبيانات المنظمة.
              </p>
            </div>

            <div className="p-6 border border-dashed border-slate-300 rounded-2xl">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">الخدمات المدعومة</h3>
              <div className="flex flex-wrap gap-2 justify-end">
                {['نقل عفش', 'تنظيف', 'تكييف', 'مكافحة حشرات', 'سباكة', 'كهرباء'].map(tag => (
                  <span key={tag} className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
