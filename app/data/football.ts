// data/football.ts

export type Club = {
  name: string;
  slug: string;
};

export type League = {
  name: string;
  slug: string;
  teamCount: number;
  clubs: Club[];
};

export type CountryLeagues = {
  country: string;
  slug: string;
  leagues: League[];
};

// Small helper so slugs stay consistent
const club = (name: string, slug?: string): Club => ({
  name,
  slug:
    slug ??
    name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/&/g, 'and')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
});

const league = (name: string, slug: string, clubs: Club[]): League => ({
  name,
  slug,
  teamCount: clubs.length,
  clubs
});

const mergeClubs = (...groups: Club[][]): Club[] => {
  const seen = new Map<string, Club>();

  groups.flat().forEach((item) => {
    if (!seen.has(item.slug)) {
      seen.set(item.slug, item);
    }
  });

  return Array.from(seen.values());
};

// -------------------- ENGLAND --------------------
const englandPremierLeague = [
  club('Arsenal'),
  club('Aston Villa'),
  club('AFC Bournemouth', 'afc-bournemouth'),
  club('Brentford'),
  club('Brighton & Hove Albion', 'brighton-and-hove-albion'),
  club('Burnley'),
  club('Chelsea'),
  club('Crystal Palace'),
  club('Everton'),
  club('Fulham'),
  club('Leeds United'),
  club('Liverpool'),
  club('Manchester City'),
  club('Manchester United'),
  club('Newcastle United'),
  club('Nottingham Forest'),
  club('Sunderland'),
  club('Tottenham Hotspur'),
  club('West Ham United'),
  club('Wolverhampton Wanderers', 'wolverhampton-wanderers')
];

const englandChampionship = [
  club('Birmingham City'),
  club('Blackburn Rovers'),
  club('Bristol City'),
  club('Charlton Athletic'),
  club('Coventry City'),
  club('Derby County'),
  club('Hull City'),
  club('Ipswich Town'),
  club('Leicester City'),
  club('Middlesbrough'),
  club('Millwall'),
  club('Norwich City'),
  club('Oxford United'),
  club('Portsmouth'),
  club('Preston North End'),
  club('Queens Park Rangers', 'queens-park-rangers'),
  club('Sheffield United'),
  club('Sheffield Wednesday'),
  club('Southampton'),
  club('Stoke City'),
  club('Swansea City'),
  club('Watford'),
  club('West Bromwich Albion', 'west-bromwich-albion'),
  club('Wrexham')
];

const englandLeagueOne = [
  club('AFC Wimbledon', 'afc-wimbledon'),
  club('Barnsley'),
  club('Blackpool'),
  club('Bolton Wanderers', 'bolton-wanderers'),
  club('Bradford City'),
  club('Burton Albion', 'burton-albion'),
  club('Cardiff City'),
  club('Doncaster Rovers', 'doncaster-rovers'),
  club('Exeter City'),
  club('Huddersfield Town', 'huddersfield-town'),
  club('Leyton Orient', 'leyton-orient'),
  club('Lincoln City'),
  club('Luton Town'),
  club('Mansfield Town', 'mansfield-town'),
  club('Northampton Town', 'northampton-town'),
  club('Peterborough United', 'peterborough-united'),
  club('Plymouth Argyle', 'plymouth-argyle'),
  club('Port Vale'),
  club('Reading'),
  club('Rotherham United', 'rotherham-united'),
  club('Stevenage'),
  club('Stockport County', 'stockport-county'),
  club('Wigan Athletic', 'wigan-athletic'),
  club('Wycombe Wanderers', 'wycombe-wanderers')
];

const englandFACup = mergeClubs(
  englandPremierLeague,
  englandChampionship,
  englandLeagueOne
);

// -------------------- SPAIN --------------------
const spainLaLiga = [
  club('Athletic Club'),
  club('Atlético de Madrid', 'atletico-de-madrid'),
  club('CA Osasuna', 'ca-osasuna'),
  club('Celta'),
  club('Deportivo Alavés', 'deportivo-alaves'),
  club('Elche CF', 'elche-cf'),
  club('FC Barcelona', 'fc-barcelona'),
  club('Getafe CF', 'getafe-cf'),
  club('Girona FC', 'girona-fc'),
  club('Levante UD', 'levante-ud'),
  club('Rayo Vallecano'),
  club('RCD Espanyol de Barcelona', 'rcd-espanyol-de-barcelona'),
  club('RCD Mallorca', 'rcd-mallorca'),
  club('Real Betis'),
  club('Real Madrid'),
  club('Real Oviedo'),
  club('Real Sociedad'),
  club('Sevilla FC', 'sevilla-fc'),
  club('Valencia CF', 'valencia-cf'),
  club('Villarreal CF', 'villarreal-cf')
];

const spainSegunda = [
  club('AD Ceuta FC', 'ad-ceuta-fc'),
  club('Albacete BP', 'albacete-bp'),
  club('Burgos CF', 'burgos-cf'),
  club('Cádiz CF', 'cadiz-cf'),
  club('CD Castellón', 'cd-castellon'),
  club('CD Leganés', 'cd-leganes'),
  club('CD Mirandés', 'cd-mirandes'),
  club('Córdoba CF', 'cordoba-cf'),
  club('Cultural y Deportiva Leonesa', 'cultural-y-deportiva-leonesa'),
  club('FC Andorra', 'fc-andorra'),
  club('Granada CF', 'granada-cf'),
  club('Málaga CF', 'malaga-cf'),
  club('Racing Santander', 'racing-santander'),
  club('Real Sociedad B', 'real-sociedad-b'),
  club('RC Deportivo', 'rc-deportivo'),
  club('Real Sporting', 'real-sporting'),
  club('Real Valladolid CF', 'real-valladolid-cf'),
  club('Real Zaragoza', 'real-zaragoza'),
  club('SD Eibar', 'sd-eibar'),
  club('SD Huesca', 'sd-huesca'),
  club('UD Almería', 'ud-almeria'),
  club('UD Las Palmas', 'ud-las-palmas')
];

const spainCopaDelRey = mergeClubs(spainLaLiga, spainSegunda);

// -------------------- GERMANY --------------------
const germanyBundesliga = [
  club('Bayern Munich'),
  club('Bayer Leverkusen'),
  club('Eintracht Frankfurt'),
  club('Borussia Dortmund'),
  club('Freiburg'),
  club('Mainz 05'),
  club('RB Leipzig'),
  club('Werder Bremen'),
  club('VfB Stuttgart', 'vfb-stuttgart'),
  club('Borussia Mönchengladbach', 'borussia-monchengladbach'),
  club('Wolfsburg'),
  club('Augsburg'),
  club('Union Berlin'),
  club('St. Pauli', 'st-pauli'),
  club('Hoffenheim'),
  club('Heidenheim'),
  club('Cologne'),
  club('Hamburg')
];

const germany2Bundesliga = [
  club('Holstein Kiel', 'holstein-kiel'),
  club('VfL Bochum', 'vfl-bochum'),
  club('SV Elversberg', 'sv-elversberg'),
  club('SC Paderborn', 'sc-paderborn'),
  club('1. FC Magdeburg', '1-fc-magdeburg'),
  club('Fortuna Düsseldorf', 'fortuna-dusseldorf'),
  club('1. FC Kaiserslautern', '1-fc-kaiserslautern'),
  club('Karlsruher SC', 'karlsruher-sc'),
  club('Hannover 96', 'hannover-96'),
  club('1. FC Nürnberg', '1-fc-nurnberg'),
  club('Hertha BSC', 'hertha-bsc'),
  club('SV Darmstadt 98', 'sv-darmstadt-98'),
  club('SpVgg Greuther Fürth', 'spvgg-greuther-furth'),
  club('FC Schalke 04', 'fc-schalke-04'),
  club('Preußen Münster', 'preussen-munster'),
  club('Eintracht Braunschweig', 'eintracht-braunschweig'),
  club('Arminia Bielefeld', 'arminia-bielefeld'),
  club('Dynamo Dresden', 'dynamo-dresden')
];

const germany3Liga = [
  club('VfL Osnabrück', 'vfl-osnabruck'),
  club('MSV Duisburg', 'msv-duisburg'),
  club('Energie Cottbus', 'energie-cottbus'),
  club('Hansa Rostock', 'hansa-rostock'),
  club('TSV 1860 München', 'tsv-1860-munchen'),
  club('Viktoria Köln', 'viktoria-koln'),
  club('SSV Ulm 1846', 'ssv-ulm-1846'),
  club('TSG Hoffenheim II', 'tsg-hoffenheim-ii'),
  club('SC Verl', 'sc-verl'),
  club('FC Ingolstadt 04', 'fc-ingolstadt-04'),
  club('SV Wehen Wiesbaden', 'sv-wehen-wiesbaden'),
  club('TSV Havelse', 'tsv-havelse'),
  club('1. FC Schweinfurt 05', '1-fc-schweinfurt-05'),
  club('Alemannia Aachen', 'alemannia-aachen'),
  club('Erzgebirge Aue', 'erzgebirge-aue'),
  club('Rot-Weiss Essen', 'rot-weiss-essen'),
  club('Waldhof Mannheim', 'waldhof-mannheim'),
  club('1. FC Saarbrücken', '1-fc-saarbrucken'),
  club('VfB Stuttgart II', 'vfb-stuttgart-ii'),
  club('Jahn Regensburg', 'jahn-regensburg')
];

const germanyDFBPokal = mergeClubs(
  germanyBundesliga,
  germany2Bundesliga,
  germany3Liga
);

// -------------------- ITALY --------------------
const italySerieA = [
  club('Atalanta'),
  club('Bologna'),
  club('Cagliari'),
  club('Como'),
  club('Cremonese'),
  club('Fiorentina'),
  club('Genoa'),
  club('Hellas Verona', 'hellas-verona'),
  club('Inter'),
  club('Juventus'),
  club('Lazio'),
  club('Lecce'),
  club('Milan'),
  club('Napoli'),
  club('Parma'),
  club('Pisa'),
  club('Roma'),
  club('Sassuolo'),
  club('Torino'),
  club('Udinese')
];

const italySerieB = [
  club('Avellino'),
  club('Bari'),
  club('Carrarese', 'carrarese'),
  club('Catanzaro'),
  club('Cesena'),
  club('Empoli'),
  club('Frosinone'),
  club('Juve Stabia', 'juve-stabia'),
  club('Mantova'),
  club('Modena'),
  club('Monza'),
  club('Padova'),
  club('Palermo'),
  club('Pescara'),
  club('Reggiana'),
  club('Sampdoria'),
  club('Spezia'),
  club('Südtirol', 'sudtirol'),
  club('Venezia'),
  club('Virtus Entella', 'virtus-entella')
];

const italySerieC = [
  // Girone A
  club('AlbinoLeffe', 'albinoleffe'),
  club('Alcione Milano', 'alcione-milano'),
  club('Arzignano Valchiampo', 'arzignano-valchiampo'),
  club('AS Cittadella', 'as-cittadella'),
  club('Aurora Pro Patria', 'aurora-pro-patria'),
  club('Calcio Lecco 1912', 'calcio-lecco-1912'),
  club('Dolomiti Bellunesi', 'dolomiti-bellunesi'),
  club('FC Lumezzane', 'fc-lumezzane'),
  club('FC Pro Vercelli 1892', 'fc-pro-vercelli-1892'),
  club('Inter U23', 'inter-u23'),
  club('LR Vicenza', 'lr-vicenza'),
  club('Novara FC', 'novara-fc'),
  club('Ospitaletto', 'ospitaletto'),
  club('Pergolettese', 'pergolettese'),
  club('Renate', 'renate'),
  club('Trento', 'trento'),
  club('Triestina', 'triestina'),
  club('Union Brescia', 'union-brescia'),
  club('Virtus Verona', 'virtus-verona'),
  club('Giana Erminio', 'giana-erminio'),

  // Girone B
  club('Arezzo'),
  club('Ascoli'),
  club('Campobasso'),
  club('Carpi'),
  club('Forlì', 'forli'),
  club('Gubbio'),
  club('Juventus Next Gen', 'juventus-next-gen'),
  club('Livorno'),
  club('Perugia'),
  club('Pineto'),
  club('Pontedera'),
  club('Ravenna'),
  club('Rimini'),
  club('Sambenedettese', 'sambenedettese'),
  club('SPAL', 'spal'),
  club('Ternana'),
  club('Torres'),
  club('Vis Pesaro', 'vis-pesaro'),
  club('Virtus Entella B', 'virtus-entella-b'),
  club('Pescara B', 'pescara-b'),

  // Girone C
  club('Atalanta U23', 'atalanta-u23'),
  club('Audace Cerignola', 'audace-cerignola'),
  club('AZ Picerno', 'az-picerno'),
  club('Benevento'),
  club('Casarano', 'casarano'),
  club('Casertana'),
  club('Catania'),
  club('Cavese'),
  club('Cosenza'),
  club('Crotone'),
  club('Foggia'),
  club('Giugliano', 'giugliano'),
  club('Latina'),
  club('Monopoli'),
  club('Potenza'),
  club('Salernitana'),
  club('Siracusa'),
  club('Sorrento'),
  club('Team Altamura', 'team-altamura'),
  club('Trapani')
];

const italyCoppaItalia = mergeClubs(italySerieA, italySerieB, italySerieC);

// -------------------- FRANCE --------------------
const franceLigue1 = [
  club('Angers SCO', 'angers-sco'),
  club('AJ Auxerre', 'aj-auxerre'),
  club('AS Monaco', 'as-monaco'),
  club('Stade Brestois', 'stade-brestois'),
  club('Lorient'),
  club('FC Metz', 'fc-metz'),
  club('FC Nantes', 'fc-nantes'),
  club('Havre AC', 'havre-ac'),
  club('LOSC', 'losc'),
  club('OGC Nice', 'ogc-nice'),
  club('Olympique Lyonnais', 'olympique-lyonnais'),
  club('Olympique de Marseille', 'olympique-de-marseille'),
  club('Paris FC', 'paris-fc'),
  club('Paris Saint-Germain', 'paris-saint-germain'),
  club('RC Lens', 'rc-lens'),
  club('Rennes'),
  club('RC Strasbourg', 'rc-strasbourg'),
  club('Toulouse FC', 'toulouse-fc')
];

const franceLigue2 = [
  club('Amiens SC', 'amiens-sc'),
  club('AS Nancy Lorraine', 'as-nancy-lorraine'),
  club('AS Saint-Étienne', 'as-saint-etienne'),
  club('Boulogne', 'boulogne'),
  club('Clermont Foot', 'clermont-foot'),
  club('EA Guingamp', 'ea-guingamp'),
  club('FC Annecy', 'fc-annecy'),
  club('Grenoble Foot 38', 'grenoble-foot-38'),
  club('Le Mans FC', 'le-mans-fc'),
  club('Montpellier HSC', 'montpellier-hsc'),
  club('Pau FC', 'pau-fc'),
  club('Red Star FC', 'red-star-fc'),
  club('Rodez AF', 'rodez-af'),
  club('SC Bastia', 'sc-bastia'),
  club('Stade Lavallois', 'stade-lavallois'),
  club('Stade de Reims', 'stade-de-reims'),
  club('ESTAC Troyes', 'estac-troyes'),
  club('USL Dunkerque', 'usl-dunkerque')
];

const franceCoupeDeFrance = mergeClubs(franceLigue1, franceLigue2);

// -------------------- PORTUGAL --------------------
const portugalLiga = [
  club('AVS'),
  club('Arouca'),
  club('Benfica'),
  club('Braga'),
  club('Casa Pia', 'casa-pia'),
  club('Estoril Praia', 'estoril-praia'),
  club('Estrela da Amadora', 'estrela-da-amadora'),
  club('FC Alverca', 'fc-alverca'),
  club('Famalicão', 'famalicao'),
  club('Gil Vicente'),
  club('Moreirense'),
  club('Nacional'),
  club('Porto'),
  club('Rio Ave'),
  club('Santa Clara'),
  club('Sporting CP', 'sporting-cp'),
  club('Tondela'),
  club('Vitória SC', 'vitoria-sc')
];

const portugalTaca = [...portugalLiga];

// -------------------- USA / CANADA --------------------
const usaMls = [
  club('Atlanta United', 'atlanta-united'),
  club('Austin FC', 'austin-fc'),
  club('Charlotte FC', 'charlotte-fc'),
  club('Chicago Fire FC', 'chicago-fire-fc'),
  club('FC Cincinnati', 'fc-cincinnati'),
  club('Colorado Rapids', 'colorado-rapids'),
  club('Columbus Crew', 'columbus-crew'),
  club('D.C. United', 'dc-united'),
  club('FC Dallas', 'fc-dallas'),
  club('Houston Dynamo FC', 'houston-dynamo-fc'),
  club('Sporting Kansas City', 'sporting-kansas-city'),
  club('LA Galaxy', 'la-galaxy'),
  club('Los Angeles FC', 'los-angeles-fc'),
  club('Inter Miami CF', 'inter-miami-cf'),
  club('Minnesota United FC', 'minnesota-united-fc'),
  club('CF Montréal', 'cf-montreal'),
  club('Nashville SC', 'nashville-sc'),
  club('New England Revolution', 'new-england-revolution'),
  club('New York City FC', 'new-york-city-fc'),
  club('New York Red Bulls', 'new-york-red-bulls'),
  club('Orlando City SC', 'orlando-city-sc'),
  club('Philadelphia Union', 'philadelphia-union'),
  club('Portland Timbers', 'portland-timbers'),
  club('Real Salt Lake', 'real-salt-lake'),
  club('San Diego FC', 'san-diego-fc'),
  club('San Jose Earthquakes', 'san-jose-earthquakes'),
  club('Seattle Sounders FC', 'seattle-sounders-fc'),
  club('St. Louis CITY SC', 'st-louis-city-sc'),
  club('Toronto FC', 'toronto-fc'),
  club('Vancouver Whitecaps FC', 'vancouver-whitecaps-fc')
];

const usaOpenCup = [...usaMls];

// -------------------- SAUDI ARABIA --------------------
const saudiProLeague = [
  club('Al Ahli', 'al-ahli'),
  club('Al Ettifaq', 'al-ettifaq'),
  club('Al Fateh', 'al-fateh'),
  club('Al Fayha', 'al-fayha'),
  club('Al Hazem', 'al-hazem'),
  club('Al Hilal', 'al-hilal'),
  club('Al Ittihad', 'al-ittihad'),
  club('Al Khaleej', 'al-khaleej'),
  club('Al Kholood', 'al-kholood'),
  club('Al Najmah', 'al-najmah'),
  club('Al Nassr', 'al-nassr'),
  club('Al Okhdood', 'al-okhdood'),
  club('Al Qadsiah', 'al-qadsiah'),
  club('Al Riyadh', 'al-riyadh'),
  club('Al Shabab', 'al-shabab'),
  club('Al Taawoun', 'al-taawoun'),
  club('Damac', 'damac'),
  club('NEOM SC', 'neom-sc')
];

const saudiKingsCup = [...saudiProLeague];

// -------------------- INDIA --------------------
const indiaIsl = [
  club('Bengaluru FC', 'bengaluru-fc'),
  club('Chennaiyin FC', 'chennaiyin-fc'),
  club('East Bengal FC', 'east-bengal-fc'),
  club('FC Goa', 'fc-goa'),
  club('Hyderabad FC', 'hyderabad-fc'),
  club('Jamshedpur FC', 'jamshedpur-fc'),
  club('Kerala Blasters FC', 'kerala-blasters-fc'),
  club('Mohammedan SC', 'mohammedan-sc'),
  club('Mohun Bagan Super Giant', 'mohun-bagan-super-giant'),
  club('Mumbai City FC', 'mumbai-city-fc'),
  club('NorthEast United FC', 'northeast-united-fc'),
  club('Odisha FC', 'odisha-fc'),
  club('Punjab FC', 'punjab-fc')
];

// -------------------- BELGIUM --------------------
const belgiumProLeague = [
  club('RSC Anderlecht', 'rsc-anderlecht'),
  club('Royal Antwerp FC', 'royal-antwerp-fc'),
  club('Cercle Brugge', 'cercle-brugge'),
  club('Club Brugge', 'club-brugge'),
  club('FCV Dender EH', 'fcv-dender-eh'),
  club('KAA Gent', 'kaa-gent'),
  club('KRC Genk', 'krc-genk'),
  club('KV Mechelen', 'kv-mechelen'),
  club('KVC Westerlo', 'kvc-westerlo'),
  club('OH Leuven', 'oh-leuven'),
  club('RAAL La Louvière', 'raal-la-louviere'),
  club('Sporting Charleroi', 'sporting-charleroi'),
  club('Standard de Liège', 'standard-de-liege'),
  club('STVV', 'stvv'),
  club('Union SG', 'union-sg'),
  club('SV Zulte Waregem', 'sv-zulte-waregem')
];

const belgiumCup = [...belgiumProLeague];

export const footballData: CountryLeagues[] = [
  {
    country: 'England',
    slug: 'england',
    leagues: [
      league('Premier League', 'premier-league', englandPremierLeague),
      league('Championship', 'championship', englandChampionship),
      league('League One', 'league-one', englandLeagueOne),
      league('FA Cup', 'fa-cup', englandFACup)
    ]
  },

  {
    country: 'Spain',
    slug: 'spain',
    leagues: [
      league('La Liga', 'la-liga', spainLaLiga),
      league('Segunda División', 'segunda-division', spainSegunda),
      league('Copa del Rey', 'copa-del-rey', spainCopaDelRey)
    ]
  },

  {
    country: 'Germany',
    slug: 'germany',
    leagues: [
      league('Bundesliga', 'bundesliga', germanyBundesliga),
      league('2. Bundesliga', '2-bundesliga', germany2Bundesliga),
      league('3. Liga', '3-liga', germany3Liga),
      league('DFB-Pokal', 'dfb-pokal', germanyDFBPokal)
    ]
  },

  {
    country: 'Italy',
    slug: 'italy',
    leagues: [
      league('Serie A', 'serie-a', italySerieA),
      league('Serie B', 'serie-b', italySerieB),
      league('Serie C', 'serie-c', italySerieC),
      league('Coppa Italia', 'coppa-italia', italyCoppaItalia)
    ]
  },

  {
    country: 'France',
    slug: 'france',
    leagues: [
      league('Ligue 1', 'ligue-1', franceLigue1),
      league('Ligue 2', 'ligue-2', franceLigue2),
      league('Coupe de France', 'coupe-de-france', franceCoupeDeFrance)
    ]
  },

  {
    country: 'Portugal',
    slug: 'portugal',
    leagues: [
      league('Liga Portugal Betclic', 'liga-portugal-betclic', portugalLiga),
      league('Taça de Portugal', 'taca-de-portugal', portugalTaca)
    ]
  },

  {
    country: 'USA / Canada',
    slug: 'usa-canada',
    leagues: [
      league('Major League Soccer (MLS)', 'mls', usaMls),
      league('U.S. Open Cup', 'us-open-cup', usaOpenCup)
    ]
  },

  {
    country: 'Saudi Arabia',
    slug: 'saudi-arabia',
    leagues: [
      league('Saudi Pro League', 'saudi-pro-league', saudiProLeague),
      league("King's Cup", 'kings-cup', saudiKingsCup)
    ]
  },

  {
    country: 'India',
    slug: 'india',
    leagues: [league('Indian Super League (ISL)', 'indian-super-league', indiaIsl)]
  },

  {
    country: 'Belgium',
    slug: 'belgium',
    leagues: [
      league('Jupiler Pro League', 'jupiler-pro-league', belgiumProLeague),
      league('Belgian Cup', 'belgian-cup', belgiumCup)
    ]
  }
];