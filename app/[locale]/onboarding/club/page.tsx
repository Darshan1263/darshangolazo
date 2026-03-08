import {Link} from '@/i18n/navigation';
import {getTranslations} from 'next-intl/server';
import {footballData} from '@/app/data/football';

// This page receives country + league from the URL
type Props = {
  searchParams: Promise<{country?: string; league?: string}>;
};

export default async function ChooseClubPage({searchParams}: Props) {
  const t = await getTranslations('ClubPage');
  const params = await searchParams;

  // Read URL values
  const selectedCountry = params.country ?? '';
  const selectedLeague = params.league ?? '';

  // Find country from the central football data
  const countryData = footballData.find(
    (country) => country.slug === selectedCountry
  );

  // Find league inside the selected country
  const leagueData = countryData?.leagues.find(
    (league) => league.slug === selectedLeague
  );

  // Use clubs from the selected league
  const clubs = leagueData?.clubs ?? [];

  // Nice heading label
  const selectedLeagueLabel = leagueData?.name ?? 'Selected League';

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
            {selectedLeagueLabel}
          </p>

          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            {t('title')}
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-sm text-white/55">
            {t('subtitle')}
          </p>
        </div>

        {/* Club cards */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {clubs.map((club, index) => (
            <Link
              key={club.slug}
              href={`/onboarding/fan-type?country=${selectedCountry}&league=${selectedLeague}&club=${club.slug}`}
              className="group rounded-[22px] border border-white/10 bg-white/[0.02] p-5 transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.04]"
            >
              <div className="flex min-h-[135px] flex-col justify-between">
                <div>
                  <div className="mb-6 h-1 w-12 rounded-full bg-[#FACC15] transition-all duration-300 group-hover:w-16" />

                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-semibold tracking-tight text-white">
                        {club.name}
                      </h2>

                      <p className="mt-2 text-xs text-white/35">
                        {leagueData?.name}
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
        {clubs.length === 0 && (
          <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-center text-white/55">
            No clubs found for this league yet.
          </div>
        )}
      </div>
    </main>
  );
}