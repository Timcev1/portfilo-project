// components/ContactForm.tsx
'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function ContactForm() {
  const t = useTranslations('ContactForm');
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const token = await window.grecaptcha.execute(  process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!,
         { action: 'submit' });

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, token }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Something went wrong');

      setStatus('success');
    } catch (err: any) {
      setError(err.message);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return <p className="text-green-600">{t('thankYouMessage')}</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input name="name" value={form.name} onChange={handleChange} placeholder={t('name')} required className="input" />
      <input type="email" name="email" value={form.email} onChange={handleChange} placeholder={t('email')} required className="input" />
      <textarea name="message" value={form.message} onChange={handleChange} placeholder={t('message')} required className="input" />

      {error && <p className="text-red-600">{error}</p>}

      <button type="submit" className="btn">
        {status === 'loading' ? t('sending') : t('send')}
      </button>
    </form>
  );
}
