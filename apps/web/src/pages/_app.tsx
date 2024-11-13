// apps/web/src/pages/_app.tsx

import '../styles/globals.css';
import Navbar from './user/components/navbar';
import UpperBar from './user/components/upper-bar';
import dynamic from 'next/dynamic';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';

// Dynamically import HeroBanner with ssr: false
const HeroBanner = dynamic(() => import('./user/components/herobanner'), {
  ssr: false,
});

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const handleScroll = () => {
      const navbarHeight = window.innerHeight * 0.08;
      if (window.scrollY > navbarHeight) {
        document.body.classList.add('scroll-hover-active');
      } else {
        document.body.classList.remove('scroll-hover-active');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Render Upper Bar and Navbar */}
      <UpperBar />
      <Navbar />

      {/* Render HeroBanner */}
      <HeroBanner />

      {/* Main content without padding-top */}
      <main>
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default MyApp;


