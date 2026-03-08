import {Link} from '@/i18n/navigation';
import {getTranslations} from 'next-intl/server';

type Props = {
  searchParams: Promise<{country?: string}>;
};

const leagueMap: Record<
  string,
  {name: string; slug: string; country: string}[]
> = {
  england: [
    {name: 'Premier League', slug: 'premier-league', country: 'England'},
    {name: 'Championship', slug: 'championship', country: 'England'},
    {name: 'FA Cup', slug: 'fa-cup', country: 'England'},
    {name: 'Carabao Cup', slug: 'carabao-cup', country: 'England'}
  ],
  spain: [
    {name: 'La Liga', slug: 'la-liga', country: 'Spain'},
    {name: 'Segunda División', slug: 'segunda-division', country: 'Spain'},
    {name: 'Copa del Rey', slug: 'copa-del-rey', country: 'Spain'}
  ],
  germany: [
    {name: 'Bundesliga', slug: 'bundesliga', country: 'Germany'},
    {name: '2. Bundesliga', slug: '2-bundesliga', country: 'Germany'},
    {name: 'DFB-Pokal', slug: 'dfb-pokal', country: 'Germany'}
  ],
  italy: [
    {name: 'Serie A', slug: 'serie-a', country: 'Italy'},
    {name: 'Serie B', slug: 'serie-b', country: 'Italy'},
    {name: 'Coppa Italia', slug: 'coppa-italia', country: 'Italy'}
  ],
  france: [
    {name: 'Ligue 1', slug: 'ligue-1', country: 'France'},
    {name: 'Ligue 2', slug: 'ligue-2', country: 'France'},
    {name: 'Coupe de France', slug: 'coupe-de-france', country: 'France'}
  ],
  portugal: [
    {name: 'Liga Portugal', slug: 'liga-portugal', country: 'Portugal'},
    {name: 'Liga Portugal 2', slug: 'liga-portugal-2', country: 'Portugal'},
    {name: 'Taça de Portugal', slug: 'taca-de-portugal', country: 'Portugal'}
  ]
};

const countryDisplayMap: Record<string, string> = {
  england: 'England',
  spain: 'Spain',
  germany: 'Germany',
  italy: 'Italy',
  france: 'France',
  portugal: 'Portugal'
};

export default async function ChooseLeaguePage({searchParams}: Props) {
 const t = await getTranslations('LeaguePage');
  const params = await searchParams;

  const selectedCountry = params.country ?? 'england';
  const leagues = leagueMap[selectedCountry] ?? [];
  const selectedCountryLabel =
    countryDisplayMap[selectedCountry] ?? 'Selected Country';

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
                        {league.country}
                      </p>
                      <h2 className="text-2xl font-semibold tracking-tight text-white">
                        {league.name}
                      </h2>
                    </div>
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

        {leagues.length === 0 && (
          <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-center text-white/55">
            No leagues found for this country yet.
          </div>
        )}
      </div>
    </main>
  );
}