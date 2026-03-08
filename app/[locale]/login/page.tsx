'use client';

import {useTranslations, useLocale} from 'next-intl';
import {useRouter} from '@/i18n/navigation';
import {Bebas_Neue} from 'next/font/google';

const golazoFont = Bebas_Neue({
  weight: '400',
  subsets: ['latin']
});

export default function LoginPage() {
  const t = useTranslations('LoginPage');
  const router = useRouter();
  const locale = useLocale();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    router.push('/onboarding/country');
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-6 text-white">
      <div className="w-full max-w-[420px]">
        <h1 className={`mb-8 text-center text-4xl tracking-[0.08em] text-white ${golazoFont.className}`}>
          GOLAZO
        </h1>

        <div className="rounded-[24px] border border-white/10 bg-[#0b0b0b] px-8 py-9 shadow-[0_0_30px_rgba(255,255,255,0.03)]">
          <h2 className="mb-7 text-center text-2xl font-light tracking-[0.08em] text-white">
            {t('title')}
          </h2>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="mb-2 block text-sm text-white/60">
                {t('email')}
              </label>
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full rounded-2xl border border-white/8 bg-[#151515] px-4 py-3 text-base text-white outline-none transition placeholder:text-white/35 focus:border-white/20"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-white/60">
                {t('password')}
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full rounded-2xl border border-white/8 bg-[#151515] px-4 py-3 text-base text-white outline-none transition placeholder:text-white/35 focus:border-white/20"
              />
            </div>

            <button
              type="submit"
              className="mt-1 w-full rounded-2xl bg-white py-3 text-base font-semibold text-black transition hover:bg-white/92"
            >
              {t('button')}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}