// apps/web/src/pages/user/home/index.tsx

import React, { useEffect, useRef } from 'react';
import WelcomeCard from '../components/welcome-card';
import Footer from '../components/footer'; // Import the Footer component

const Home = () => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-visible');
          }
        });
      },
      {
        threshold: 0.2, // Trigger when 20% of the element is visible
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div ref={cardRef} className="fade-in">
        <WelcomeCard />
      </div>
      {/* Insert Footer below other content */}
      <Footer />
    </div>
  );
};

export default Home;




