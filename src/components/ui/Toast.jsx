import { useState, useEffect } from 'react';

let toastId = 0;

export function useToast() {
  const [toasts, setToasts] = useState([]);
  const addToast = (message, type = 'success') => {
    const id = ++toastId;
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500);
  };
  return { toasts, addToast };
}

export function ToastContainer({ toasts }) {
  return (
    <div className="fixed bottom-4 right-4 z-[999] flex flex-col gap-2">
      {toasts.map(t => (
        <div
          key={t.id}
          className={`px-5 py-3 rounded-xl shadow-lg text-white text-sm font-medium animate-slide-up ${
            t.type === 'success' ? 'bg-accent-500' :
            t.type === 'error' ? 'bg-danger-500' :
            'bg-primary-500'
          }`}
        >
          {t.type === 'success' ? '✅ ' : t.type === 'error' ? '❌ ' : 'ℹ️ '}{t.message}
        </div>
      ))}
    </div>
  );
}
