import {Link} from '@/i18n/navigation';
import {getTranslations} from 'next-intl/server';

type Props = {
  searchParams: Promise<{country?: string; league?: string}>;
};

const clubMap: Record<
  string,
  {name: string; slug: string}[]
> = {
  'premier-league': [
    {name: 'Arsenal', slug: 'arsenal'},
    {name: 'Chelsea', slug: 'chelsea'},
    {name: 'Liverpool', slug: 'liverpool'},
    {name: 'Manchester City', slug: 'manchester-city'},
    {name: 'Manchester United', slug: 'manchester-united'},
    {name: 'Tottenham Hotspur', slug: 'tottenham-hotspur'}
  ],
  championship: [
    {name: 'Leeds United', slug: 'leeds-united'},
    {name: 'Southampton', slug: 'southampton'},
    {name: 'Leicester City', slug: 'leicester-city'},
    {name: 'Norwich City', slug: 'norwich-city'},
    {name: 'West Bromwich Albion', slug: 'west-bromwich-albion'},
    {name: 'Sunderland', slug: 'sunderland'}
  ],
  'fa-cup': [
    {name: 'Arsenal', slug: 'arsenal'},
    {name: 'Manchester City', slug: 'manchester-city'},
    {name: 'Chelsea', slug: 'chelsea'},
    {name: 'Liverpool', slug: 'liverpool'}
  ],
  'carabao-cup': [
    {name: 'Liverpool', slug: 'liverpool'},
    {name: 'Chelsea', slug: 'chelsea'},
    {name: 'Manchester United', slug: 'manchester-united'},
    {name: 'Newcastle United', slug: 'newcastle-united'}
  ],
  'la-liga': [
    {name: 'Barcelona', slug: 'barcelona'},
    {name: 'Real Madrid', slug: 'real-madrid'},
    {name: 'Atlético Madrid', slug: 'atletico-madrid'},
    {name: 'Sevilla', slug: 'sevilla'},
    {name: 'Real Sociedad', slug: 'real-sociedad'},
    {name: 'Valencia', slug: 'valencia'}
  ],
  'segunda-division': [
    {name: 'Levante', slug: 'levante'},
    {name: 'Eibar', slug: 'eibar'},
    {name: 'Real Zaragoza', slug: 'real-zaragoza'},
    {name: 'Sporting Gijón', slug: 'sporting-gijon'}
  ],
  'copa-del-rey': [
    {name: 'Barcelona', slug: 'barcelona'},
    {name: 'Real Madrid', slug: 'real-madrid'},
    {name: 'Athletic Club', slug: 'athletic-club'},
    {name: 'Mallorca', slug: 'mallorca'}
  ],
  bundesliga: [
    {name: 'Bayern Munich', slug: 'bayern-munich'},
    {name: 'Borussia Dortmund', slug: 'borussia-dortmund'},
    {name: 'RB Leipzig', slug: 'rb-leipzig'},
    {name: 'Bayer Leverkusen', slug: 'bayer-leverkusen'},
    {name: 'Stuttgart', slug: 'stuttgart'},
    {name: 'Wolfsburg', slug: 'wolfsburg'}
  ],
  '2-bundesliga': [
    {name: 'Hamburger SV', slug: 'hamburger-sv'},
    {name: 'Hertha Berlin', slug: 'hertha-berlin'},
    {name: 'Schalke 04', slug: 'schalke-04'},
    {name: 'Hannover 96', slug: 'hannover-96'}
  ],
  'dfb-pokal': [
    {name: 'Bayern Munich', slug: 'bayern-munich'},
    {name: 'Borussia Dortmund', slug: 'borussia-dortmund'},
    {name: 'Bayer Leverkusen', slug: 'bayer-leverkusen'},
    {name: 'Eintracht Frankfurt', slug: 'eintracht-frankfurt'}
  ],
  'serie-a': [
    {name: 'Juventus', slug: 'juventus'},
    {name: 'Inter Milan', slug: 'inter-milan'},
    {name: 'AC Milan', slug: 'ac-milan'},
    {name: 'Napoli', slug: 'napoli'},
    {name: 'Roma', slug: 'roma'},
    {name: 'Atalanta', slug: 'atalanta'}
  ],
  'serie-b': [
    {name: 'Palermo', slug: 'palermo'},
    {name: 'Parma', slug: 'parma'},
    {name: 'Sampdoria', slug: 'sampdoria'},
    {name: 'Bari', slug: 'bari'}
  ],
  'coppa-italia': [
    {name: 'Juventus', slug: 'juventus'},
    {name: 'Inter Milan', slug: 'inter-milan'},
    {name: 'Lazio', slug: 'lazio'},
    {name: 'Fiorentina', slug: 'fiorentina'}
  ],
  'ligue-1': [
    {name: 'Paris Saint-Germain', slug: 'psg'},
    {name: 'Marseille', slug: 'marseille'},
    {name: 'Lyon', slug: 'lyon'},
    {name: 'Monaco', slug: 'monaco'},
    {name: 'Lille', slug: 'lille'},
    {name: 'Nice', slug: 'nice'}
  ],
  'ligue-2': [
    {name: 'Saint-Étienne', slug: 'saint-etienne'},
    {name: 'Auxerre', slug: 'auxerre'},
    {name: 'Caen', slug: 'caen'},
    {name: 'Bastia', slug: 'bastia'}
  ],
  'coupe-de-france': [
    {name: 'Paris Saint-Germain', slug: 'psg'},
    {name: 'Marseille', slug: 'marseille'},
    {name: 'Rennes', slug: 'rennes'},
    {name: 'Nantes', slug: 'nantes'}
  ],
  'liga-portugal': [
    {name: 'Benfica', slug: 'benfica'},
    {name: 'Porto', slug: 'porto'},
    {name: 'Sporting CP', slug: 'sporting-cp'},
    {name: 'Braga', slug: 'braga'},
    {name: 'Vitória SC', slug: 'vitoria-sc'}
  ],
  'liga-portugal-2': [
    {name: 'Marítimo', slug: 'maritimo'},
    {name: 'Leixões', slug: 'leixoes'},
    {name: 'Académico Viseu', slug: 'academico-viseu'},
    {name: 'Tondela', slug: 'tondela'}
  ],
  'taca-de-portugal': [
    {name: 'Benfica', slug: 'benfica'},
    {name: 'Porto', slug: 'porto'},
    {name: 'Sporting CP', slug: 'sporting-cp'},
    {name: 'Braga', slug: 'braga'}
  ]
};

const leagueDisplayMap: Record<string, string> = {
  'premier-league': 'Premier League',
  championship: 'Championship',
  'fa-cup': 'FA Cup',
  'carabao-cup': 'Carabao Cup',
  'la-liga': 'La Liga',
  'segunda-division': 'Segunda División',
  'copa-del-rey': 'Copa del Rey',
  bundesliga: 'Bundesliga',
  '2-bundesliga': '2. Bundesliga',
  'dfb-pokal': 'DFB-Pokal',
  'serie-a': 'Serie A',
  'serie-b': 'Serie B',
  'coppa-italia': 'Coppa Italia',
  'ligue-1': 'Ligue 1',
  'ligue-2': 'Ligue 2',
  'coupe-de-france': 'Coupe de France',
  'liga-portugal': 'Liga Portugal',
  'liga-portugal-2': 'Liga Portugal 2',
  'taca-de-portugal': 'Taça de Portugal'
};

export default async function ChooseClubPage({searchParams}: Props) {
  const t = await getTranslations('ClubPage');
  const params = await searchParams;

  const selectedCountry = params.country ?? '';
  const selectedLeague = params.league ?? '';
  const clubs = clubMap[selectedLeague] ?? [];
  const selectedLeagueLabel =
    leagueDisplayMap[selectedLeague] ?? 'Selected League';

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
            {selectedLeagueLabel}
          </p>
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            {t('title')}
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm text-white/55">
            {t('subtitle')}
          </p>
        </div>

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
                    <h2 className="text-2xl font-semibold tracking-tight text-white">
                      {club.name}
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

        {clubs.length === 0 && (
          <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-center text-white/55">
            No clubs found for this league yet.
          </div>
        )}
      </div>
    </main>
  );
}