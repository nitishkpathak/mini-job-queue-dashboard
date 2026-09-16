import React, { useEffect } from 'react';
import { CheckCircle2, AlertTriangle, XCircle, X } from 'lucide-react';

export default function NotificationToast({ toast, onClose }) {
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [toast, onClose]);

  if (!toast) return null;

  const isSuccess = toast.type === 'success';
  const isConflict = toast.type === 'conflict';

  return (
    <div className="fixed bottom-5 right-5 z-50 max-w-md w-full px-4 animate-in slide-in-from-bottom-5 duration-300">
      <div
        className={`p-4 rounded-xl border shadow-2xl flex items-start space-x-3 backdrop-blur-md ${
          isSuccess
            ? 'bg-emerald-950/90 border-emerald-500/30 text-emerald-200'
            : isConflict
            ? 'bg-amber-950/90 border-amber-500/30 text-amber-200'
            : 'bg-rose-950/90 border-rose-500/30 text-rose-200'
        }`}
      >
        {isSuccess ? (
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
        ) : isConflict ? (
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        ) : (
          <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
        )}

        <div className="flex-1 text-xs">
          <h4 className="font-semibold text-sm mb-0.5">{toast.title}</h4>
          <p className="opacity-90">{toast.message}</p>
        </div>

        <button
          onClick={onClose}
          className="text-slate-400 hover:text-white p-1 rounded-lg transition"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
