import {useTranslations} from 'next-intl';
import {Bebas_Neue} from 'next/font/google';
import {ArrowRight} from 'lucide-react';
import {Link} from '@/i18n/navigation';

const golazoFont = Bebas_Neue({
  weight: '400',
  subsets: ['latin']
});

export default function HomePage() {
  const t = useTranslations('HomePage');

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
      <h1 className={`mb-12 text-7xl tracking-wider ${golazoFont.className}`}>
        {t('title')}
      </h1>

      <Link
        href="/register"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FACC15] text-black transition hover:scale-110"
      >
        <ArrowRight size={26} />
      </Link>
    </main>
  );
}