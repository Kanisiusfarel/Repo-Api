import Link from 'next/link';

const Navbar = () => {
  return (
    <div className="navbar-container">
      <nav className="navbar fixed top-0 left-0 w-full h-[8vh] flex items-center justify-center transition-all duration-300">
        
        {/* Logo on the far left, adjusted */}
        <div className="absolute left-8">  {/* Change from left-4 to left-8 */}
          <img
            src="/logo/FA+logo.png"
            alt="FA Plus Logo"
            className="max-h-1/3 sm:max-h-1/4 md:max-h-1/6 lg:max-h-1/8 object-contain"
          />
        </div>

        {/* Centered Navigation Links */}
        <div className="flex space-x-8">
          <Link href="/user/home">
            <span className="hover:underline-animation">Home</span>
          </Link>
          <Link href="/user/events">
            <span className="hover:underline-animation">Events</span>
          </Link>
          <Link href="/user/manage">
            <span className="hover:underline-animation">Manage</span>
          </Link>
          <Link href="/user/about">
            <span className="hover:underline-animation">About</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;







