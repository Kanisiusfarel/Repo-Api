// apps/web/src/pages/user/components/footer/index.tsx

import React from 'react';

const Footer = () => {
  return (
    <div className="w-full h-[18vh] bg-black text-white flex flex-col justify-center items-center py-4">
      <div className="text-center">
        <h2 className="text-xl sm:text-2xl font-bold">FA Plus</h2>
        <p className="mt-2 text-xs sm:text-sm">© {new Date().getFullYear()} FA Plus. All rights reserved.</p>
        <div className="mt-2">
          <p className="text-xs sm:text-sm">Privacy Policy | Terms & Conditions</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;


