import { useState, useEffect } from 'react';
import { PROPERTY_TYPES, PROPERTY_STATUSES, CITIES, FEATURES_LIST } from '../../utils/constants';

const empty = { title: '', description: '', price: '', address: '', city: '', state: '', zipCode: '', beds: '', baths: '', sqft: '', lotSize: '', yearBuilt: '', type: 'House', status: 'For Sale', features: [], images: ['https://picsum.photos/seed/new1/800/600', 'https://picsum.photos/seed/new2/800/600'] };

export default function PropertyForm({ initialData, onSubmit, loading }) {
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});

  useEffect(() => { if (initialData) setForm({ ...empty, ...initialData }); }, [initialData]);

  const set = (key, val) => { setForm(p => ({ ...p, [key]: val })); setErrors(p => ({ ...p, [key]: '' })); };

  const toggleFeature = (f) => {
    setForm(p => ({ ...p, features: p.features.includes(f) ? p.features.filter(x => x !== f) : [...p.features, f] }));
  };

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = 'Title is required';
    if (!form.price || form.price <= 0) e.price = 'Valid price required';
    if (!form.city) e.city = 'City is required';
    if (!form.beds || form.beds <= 0) e.beds = 'Bedrooms required';
    if (!form.baths || form.baths <= 0) e.baths = 'Bathrooms required';
    if (!form.sqft || form.sqft <= 0) e.sqft = 'Square footage required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({
      ...form,
      price: Number(form.price), beds: Number(form.beds), baths: Number(form.baths),
      sqft: Number(form.sqft), lotSize: form.lotSize ? Number(form.lotSize) : null,
      yearBuilt: form.yearBuilt ? Number(form.yearBuilt) : null,
      createdAt: form.createdAt || new Date().toISOString().split('T')[0],
      isFeatured: false,
      agent: form.agent || { name: 'You', phone: '(555) 000-0000', email: 'you@nestquest.com' },
    });
  };

  const inputClass = (key) => `w-full px-4 py-3 rounded-xl border ${errors[key] ? 'border-rose-400 ring-2 ring-rose-200' : 'border-gray-200 dark:border-dark-600'} bg-white dark:bg-dark-700 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all text-gray-800 dark:text-gray-200`;
  const labelClass = "block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="md:col-span-2">
          <label className={labelClass}>Title *</label>
          <input type="text" value={form.title} onChange={e => set('title', e.target.value)} className={inputClass('title')} placeholder="e.g. Beautiful 3-Bedroom House" />
          {errors.title && <p className="text-rose-500 text-xs mt-1">{errors.title}</p>}
        </div>
        <div className="md:col-span-2">
          <label className={labelClass}>Description</label>
          <textarea value={form.description} onChange={e => set('description', e.target.value)} rows={3} className={inputClass('description')} placeholder="Describe the property..." />
        </div>
        <div>
          <label className={labelClass}>Price ($) *</label>
          <input type="number" value={form.price} onChange={e => set('price', e.target.value)} className={inputClass('price')} placeholder="250000" />
          {errors.price && <p className="text-rose-500 text-xs mt-1">{errors.price}</p>}
        </div>
        <div>
          <label className={labelClass}>Type</label>
          <select value={form.type} onChange={e => set('type', e.target.value)} className={inputClass('type')}>
            {PROPERTY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label className={labelClass}>City *</label>
          <select value={form.city} onChange={e => set('city', e.target.value)} className={inputClass('city')}>
            <option value="">Select city</option>
            {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          {errors.city && <p className="text-rose-500 text-xs mt-1">{errors.city}</p>}
        </div>
        <div>
          <label className={labelClass}>Status</label>
          <select value={form.status} onChange={e => set('status', e.target.value)} className={inputClass('status')}>
            {PROPERTY_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className={labelClass}>Bedrooms *</label>
          <input type="number" value={form.beds} onChange={e => set('beds', e.target.value)} className={inputClass('beds')} min="1" />
          {errors.beds && <p className="text-rose-500 text-xs mt-1">{errors.beds}</p>}
        </div>
        <div>
          <label className={labelClass}>Bathrooms *</label>
          <input type="number" value={form.baths} onChange={e => set('baths', e.target.value)} className={inputClass('baths')} min="1" />
          {errors.baths && <p className="text-rose-500 text-xs mt-1">{errors.baths}</p>}
        </div>
        <div>
          <label className={labelClass}>Square Feet *</label>
          <input type="number" value={form.sqft} onChange={e => set('sqft', e.target.value)} className={inputClass('sqft')} />
          {errors.sqft && <p className="text-rose-500 text-xs mt-1">{errors.sqft}</p>}
        </div>
        <div>
          <label className={labelClass}>Year Built</label>
          <input type="number" value={form.yearBuilt} onChange={e => set('yearBuilt', e.target.value)} className={inputClass('yearBuilt')} placeholder="2020" />
        </div>
        <div>
          <label className={labelClass}>Address</label>
          <input type="text" value={form.address} onChange={e => set('address', e.target.value)} className={inputClass('address')} placeholder="123 Main St" />
        </div>
        <div>
          <label className={labelClass}>Lot Size (sqft)</label>
          <input type="number" value={form.lotSize || ''} onChange={e => set('lotSize', e.target.value)} className={inputClass('lotSize')} />
        </div>
      </div>

      <div>
        <label className={labelClass}>Features</label>
        <div className="flex flex-wrap gap-2">
          {FEATURES_LIST.map(f => (
            <button key={f} type="button" onClick={() => toggleFeature(f)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                form.features.includes(f) ? 'bg-primary-600 text-white shadow-md' : 'bg-gray-100 dark:bg-dark-700 text-gray-600 dark:text-gray-400 hover:bg-primary-100 dark:hover:bg-dark-600'
              }`}>{f}</button>
          ))}
        </div>
      </div>

      <button type="submit" disabled={loading}
        className="w-full py-3.5 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white font-bold rounded-xl shadow-lg shadow-primary-600/30 transition-all disabled:opacity-50 text-sm">
        {loading ? 'Saving...' : initialData ? 'Update Property' : 'Add Property'}
      </button>
    </form>
  );
}
