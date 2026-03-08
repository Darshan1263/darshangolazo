'use client';

import {useState} from 'react';
import {useRouter, useSearchParams} from 'next/navigation';
import {useTranslations} from 'next-intl';

const fanTypes = [
  {
    id: 'hardcore',
    emoji: '🔥',
    titleKey: 'hardcoreTitle',
    descriptionKey: 'hardcoreDescription'
  },
  {
    id: 'casual',
    emoji: '☕',
    titleKey: 'casualTitle',
    descriptionKey: 'casualDescription'
  },
  {
    id: 'new-supporter',
    emoji: '🌱',
    titleKey: 'newTitle',
    descriptionKey: 'newDescription'
  },
  {
    id: 'emotional',
    emoji: '💚',
    titleKey: 'emotionalTitle',
    descriptionKey: 'emotionalDescription'
  }
];

export default function FanTypePage() {
  const t = useTranslations('FanTypePage');
  const router = useRouter();
  const searchParams = useSearchParams();

  // keep club / league / country data in the URL flow
  const country = searchParams.get('country') ?? '';
  const league = searchParams.get('league') ?? '';
  const club = searchParams.get('club') ?? '';

  const [selectedFanType, setSelectedFanType] = useState<string>('');

  function handleContinue() {
    if (!selectedFanType) return;

    // Later this can go to the real club hub or dashboard
    router.push(
      `/hub/${club}?country=${country}&league=${league}&fanType=${selectedFanType}`
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-black px-5 py-10 text-white">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-[0.05]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)
            `,
            backgroundSize: '72px 72px'
          }}
        />
      </div>

      {/* Soft glow */}
      <div className="absolute left-1/2 top-[28%] h-[220px] w-[220px] -translate-x-1/2 rounded-full bg-[#FACC15]/[0.04] blur-3xl" />

      <div className="relative mx-auto max-w-5xl">
        {/* Page header */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            {t('title')}
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm text-white/55">
            {t('subtitle')}
          </p>
        </div>

        {/* Fan type cards */}
        <div className="grid gap-4 sm:grid-cols-2">
          {fanTypes.map((fanType) => {
            const isSelected = selectedFanType === fanType.id;

            return (
              <button
                key={fanType.id}
                type="button"
                onClick={() => setSelectedFanType(fanType.id)}
                className={`rounded-[22px] border p-6 text-left transition duration-300 ${
                  isSelected
                    ? 'border-[#FACC15] bg-white/[0.06] shadow-[0_0_30px_rgba(250,204,21,0.08)]'
                    : 'border-white/10 bg-white/[0.02] hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.04]'
                }`}
              >
                <div className="flex min-h-[170px] flex-col justify-between">
                  <div>
                    <div className="mb-5 text-4xl">{fanType.emoji}</div>
                    <h2 className="text-2xl font-semibold tracking-tight text-white">
                      {t(fanType.titleKey)}
                    </h2>
                  </div>

                  <p className="mt-4 max-w-md text-sm leading-7 text-white/55">
                    {t(fanType.descriptionKey)}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Continue button */}
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={handleContinue}
            disabled={!selectedFanType}
            className={`rounded-2xl px-8 py-4 text-base font-semibold transition ${
              selectedFanType
                ? 'bg-[#FACC15] text-black hover:scale-[1.02]'
                : 'cursor-not-allowed bg-white/10 text-white/35'
            }`}
          >
            {t('button')}
          </button>
        </div>
      </div>
    </main>
  );
}