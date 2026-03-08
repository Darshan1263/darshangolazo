import {Link} from '@/i18n/navigation';
import {useTranslations} from 'next-intl';

const countries = [
  {name: 'England', slug: 'england'},
  {name: 'Spain', slug: 'spain'},
  {name: 'Germany', slug: 'germany'},
  {name: 'Italy', slug: 'italy'},
  {name: 'France', slug: 'france'},
  {name: 'Portugal', slug: 'portugal'}
];

export default function ChooseCountryPage() {
  const t = useTranslations('CountryPage');

  return (
    <main className="relative min-h-screen overflow-hidden bg-black px-5 py-10 text-white">
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

      <div className="absolute left-1/2 top-[34%] h-[220px] w-[220px] -translate-x-1/2 rounded-full bg-[#FACC15]/[0.04] blur-3xl" />

      <div className="relative mx-auto max-w-5xl">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">
            {t('title')}
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm text-white/55">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {countries.map((country, index) => (
            <Link
              key={country.slug}
              href={`/onboarding/league?country=${country.slug}`}
              className="group rounded-[22px] border border-white/10 bg-white/[0.02] p-5 transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.04]"
            >
              <div className="flex min-h-[150px] flex-col justify-between">
                <div>
                  <div className="mb-6 h-1 w-12 rounded-full bg-[#FACC15] transition-all duration-300 group-hover:w-16" />
                  <div className="flex items-start justify-between gap-4">
                    <h2 className="text-2xl font-semibold tracking-tight text-white">
                      {country.name}
                    </h2>
                    <span className="text-sm text-white/20">
                      0{index + 1}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-sm text-white/45">{t('cta')}</p>
                  <span className="text-base text-white/30 transition duration-300 group-hover:translate-x-1 group-hover:text-white/70">
                    →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}