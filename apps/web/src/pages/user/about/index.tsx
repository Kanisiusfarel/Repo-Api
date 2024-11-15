// apps/web/src/pages/user/about/index.tsx

import Footer from "../components/footer";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div className="flex-grow flex justify-center items-center">
        <h1 className="text-2xl">This is the About Page</h1>
      </div>
      <Footer />
    </div>
  );
};

export default About;



  