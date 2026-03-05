import React from 'react';
import ReactMarkdown from 'react-markdown';
import { FileText, CheckCircle, AlertCircle, Download, Copy } from 'lucide-react';
import { motion } from 'motion/react';

interface AuditResultsProps {
  results: string;
}

export const AuditResults: React.FC<AuditResultsProps> = ({ results }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(results);
    alert('تم نسخ النتائج إلى الحافظة!');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-12 space-y-8 text-right"
      dir="rtl"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
          <FileText className="text-blue-600" /> تقرير الفحص
        </h2>
        <div className="flex gap-2">
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
          >
            <Copy size={16} /> نسخ بصيغة Markdown
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-8 prose prose-slate max-w-none prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-h2:mt-8 prose-h2:pb-2 prose-h2:border-b prose-h2:border-slate-100 prose-pre:bg-slate-900 prose-pre:text-slate-100 prose-code:text-blue-600 prose-code:bg-blue-50 prose-code:px-1 prose-code:rounded text-right">
          <ReactMarkdown>{results}</ReactMarkdown>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-emerald-50 border border-emerald-100 rounded-xl flex items-start gap-4 text-right">
          <CheckCircle className="text-emerald-600 shrink-0" size={24} />
          <div>
            <h3 className="font-semibold text-emerald-900">جاهزية تقنية</h3>
            <p className="text-sm text-emerald-700 mt-1">تم تحديد جميع المشاكل التقنية الحرجة وتقديم الحلول لها.</p>
          </div>
        </div>
        <div className="p-6 bg-blue-50 border border-blue-100 rounded-xl flex items-start gap-4 text-right">
          <FileText className="text-blue-600 shrink-0" size={24} />
          <div>
            <h3 className="font-semibold text-blue-900">متوافق مع النية</h3>
            <p className="text-sm text-blue-700 mt-1">هيكل المحتوى محسن لنية البحث عن الخدمات المحلية.</p>
          </div>
        </div>
        <div className="p-6 bg-amber-50 border border-amber-100 rounded-xl flex items-start gap-4 text-right">
          <AlertCircle className="text-amber-600 shrink-0" size={24} />
          <div>
            <h3 className="font-semibold text-amber-900">إجراء مطلوب</h3>
            <p className="text-sm text-amber-700 mt-1">راجع قسم head المحسن وقم بتطبيق التغييرات المقترحة.</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
