'use client';

import { useLocale } from './Context/LocaleContext';
import './globals.css';
import BannerSlider from './components/BannerSlider';
export default function HomePage() {
  const { messages } = useLocale();

  return (
    <>
      <BannerSlider />
      <main style={{ padding: '1rem' }}>
        <h1>{messages.greeting}</h1>
      </main>
    </>
  );
}
