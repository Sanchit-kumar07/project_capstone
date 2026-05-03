import { useState } from 'react';

const STEPS = ['Basic Info', 'Dates & Budget', 'Details'];

export default function TripForm({ initialData, onSubmit, isEdit = false }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name: '', destination: '', countryCode: '', startDate: '', endDate: '',
    budget: '', currency: 'USD', notes: '', coverImage: '', status: 'planning',
    ...initialData,
  });
  const [errors, setErrors] = useState({});

  const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const validateStep = () => {
    const errs = {};
    if (step === 0) {
      if (!form.name.trim()) errs.name = 'Trip name is required';
      if (!form.destination.trim()) errs.destination = 'Destination is required';
    }
    if (step === 1) {
      if (!form.startDate) errs.startDate = 'Start date is required';
      if (!form.endDate) errs.endDate = 'End date is required';
      if (form.startDate && form.endDate && form.endDate < form.startDate) errs.endDate = 'Must be after start date';
      if (!form.budget || Number(form.budget) <= 0) errs.budget = 'Budget must be positive';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const next = () => { if (validateStep()) setStep(s => s + 1); };
  const prev = () => setStep(s => s - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateStep()) return;
    onSubmit({
      ...form,
      budget: Number(form.budget),
      coverImage: form.coverImage || `https://picsum.photos/seed/${form.destination.toLowerCase().replace(/\s/g, '')}/800/400`,
    });
  };

  const inputClass = (field) =>
    `w-full px-4 py-3 bg-gray-50 dark:bg-dark-900 border rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none text-gray-800 dark:text-white ${
      errors[field] ? 'border-danger-500' : 'border-gray-200 dark:border-gray-700'
    }`;

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      {/* Steps indicator */}
      <div className="flex items-center justify-center gap-2 mb-8">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
              i <= step ? 'bg-primary-500 text-white' : 'bg-gray-200 dark:bg-dark-800 text-gray-400'
            }`}>
              {i < step ? '✓' : i + 1}
            </div>
            <span className={`text-sm hidden sm:inline ${i <= step ? 'text-primary-500 font-medium' : 'text-gray-400'}`}>{s}</span>
            {i < STEPS.length - 1 && <div className={`w-8 h-0.5 ${i < step ? 'bg-primary-500' : 'bg-gray-200 dark:bg-dark-800'}`} />}
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-dark-800 rounded-2xl p-6 shadow-md border border-gray-100 dark:border-gray-700/50 animate-fade-in">
        {/* Step 1: Basic Info */}
        {step === 0 && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">✈️ Basic Info</h3>
            <div>
              <label className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1 block">Trip Name</label>
              <input type="text" value={form.name} onChange={e => update('name', e.target.value)} placeholder="e.g. European Getaway" className={inputClass('name')} />
              {errors.name && <p className="text-xs text-danger-500 mt-1">{errors.name}</p>}
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1 block">Destination Country</label>
              <input type="text" value={form.destination} onChange={e => update('destination', e.target.value)} placeholder="e.g. France" className={inputClass('destination')} />
              {errors.destination && <p className="text-xs text-danger-500 mt-1">{errors.destination}</p>}
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1 block">Status</label>
              <select value={form.status} onChange={e => update('status', e.target.value)} className={inputClass('status')}>
                <option value="planning">Planning</option>
                <option value="upcoming">Upcoming</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
        )}

        {/* Step 2: Dates & Budget */}
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">📅 Dates & Budget</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1 block">Start Date</label>
                <input type="date" value={form.startDate} onChange={e => update('startDate', e.target.value)} className={inputClass('startDate')} />
                {errors.startDate && <p className="text-xs text-danger-500 mt-1">{errors.startDate}</p>}
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1 block">End Date</label>
                <input type="date" value={form.endDate} onChange={e => update('endDate', e.target.value)} className={inputClass('endDate')} />
                {errors.endDate && <p className="text-xs text-danger-500 mt-1">{errors.endDate}</p>}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1 block">Budget</label>
                <input type="number" value={form.budget} onChange={e => update('budget', e.target.value)} min="0" className={inputClass('budget')} />
                {errors.budget && <p className="text-xs text-danger-500 mt-1">{errors.budget}</p>}
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1 block">Currency</label>
                <select value={form.currency} onChange={e => update('currency', e.target.value)} className={inputClass('currency')}>
                  {['USD', 'EUR', 'GBP', 'JPY', 'INR', 'AUD', 'CAD', 'CHF', 'SGD', 'AED'].map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Details */}
        {step === 2 && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">📝 Details</h3>
            <div>
              <label className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1 block">Notes</label>
              <textarea
                value={form.notes}
                onChange={e => update('notes', e.target.value)}
                placeholder="Places to visit, things to do..."
                rows={4}
                className={`${inputClass('notes')} resize-none`}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1 block">Cover Image URL (optional)</label>
              <input type="url" value={form.coverImage} onChange={e => update('coverImage', e.target.value)} placeholder="https://..." className={inputClass('coverImage')} />
            </div>
            {(form.coverImage || form.destination) && (
              <div className="rounded-xl overflow-hidden h-40">
                <img
                  src={form.coverImage || `https://picsum.photos/seed/${form.destination.toLowerCase().replace(/\s/g, '')}/800/400`}
                  alt="Cover preview"
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.src = 'https://picsum.photos/seed/travel/800/400'; }}
                />
              </div>
            )}
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          {step > 0 ? (
            <button type="button" onClick={prev} className="px-6 py-2.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 font-medium rounded-xl transition-colors">
              ← Back
            </button>
          ) : <div />}

          {step < STEPS.length - 1 ? (
            <button type="button" onClick={next} className="px-6 py-2.5 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-primary-500/25">
              Next →
            </button>
          ) : (
            <button type="submit" className="px-8 py-2.5 bg-accent-500 hover:bg-accent-600 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-accent-500/25">
              {isEdit ? '💾 Save Changes' : '🚀 Create Trip'}
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
