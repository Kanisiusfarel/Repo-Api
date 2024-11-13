// apps/web/src/pages/user/home/index.tsx

import React from 'react';
import WelcomeCard from '../components/welcome-card';
import Footer from '../components/footer'; // Import the Footer component

const Home = () => {
  return (
    <div className="flex flex-col items-center">
      <WelcomeCard />
      {/* Any other content for the home page */}

      {/* Insert Footer below other content */}
      <Footer />
    </div>
  );
};

export default Home;



