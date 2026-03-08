import {Link} from '@/i18n/navigation';
import {getTranslations} from 'next-intl/server';
import {footballData} from '@/app/data/football';

// This page receives the selected country from the URL
type Props = {
  searchParams: Promise<{country?: string}>;
};

export default async function ChooseLeaguePage({searchParams}: Props) {
  const t = await getTranslations('LeaguePage');
  const params = await searchParams;

  // Country slug passed from the country page
  const selectedCountry = params.country ?? 'england';

  // Find the selected country inside the central football data
  const countryData = footballData.find(
    (country) => country.slug === selectedCountry
  );

  // Use the leagues from that country
  const leagues = countryData?.leagues ?? [];

  // Nice label for the page header
  const selectedCountryLabel = countryData?.country ?? 'Selected Country';

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

      {/* Soft yellow glow */}
      <div className="absolute left-1/2 top-[34%] h-[220px] w-[220px] -translate-x-1/2 rounded-full bg-[#FACC15]/[0.04] blur-3xl" />

      <div className="relative mx-auto max-w-5xl">
        {/* Page heading */}
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm uppercase tracking-[0.25em] text-white/40">
            {selectedCountryLabel}
          </p>

          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            {t('title')}
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-sm text-white/55">
            {t('subtitle')}
          </p>
        </div>

        {/* League cards */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {leagues.map((league, index) => (
            <Link
              key={league.slug}
              href={`/onboarding/club?country=${selectedCountry}&league=${league.slug}`}
              className="group rounded-[22px] border border-white/10 bg-white/[0.02] p-5 transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.04]"
            >
              <div className="flex min-h-[135px] flex-col justify-between">
                <div>
                  <div className="mb-6 h-1 w-12 rounded-full bg-[#FACC15] transition-all duration-300 group-hover:w-16" />

                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="mb-2 text-sm text-white/45">
                        {countryData?.country}
                      </p>

                      <h2 className="text-2xl font-semibold tracking-tight text-white">
                        {league.name}
                      </h2>

                      <p className="mt-2 text-xs text-white/35">
                        {league.teamCount} teams
                      </p>
                    </div>

                    <span className="text-sm text-white/20">
                      {String(index + 1).padStart(2, '0')}
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

        {/* Empty state */}
        {leagues.length === 0 && (
          <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-center text-white/55">
            No leagues found for this country yet.
          </div>
        )}
      </div>
    </main>
  );
}