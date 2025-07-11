import { useState } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaPhoneAlt,
  FaTicketAlt,
  FaUser,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import logo from '../../../assets/images/logo.png';
import { useNavigate, Link } from 'react-router-dom';

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle("dark", !isDarkMode);
  };

  return (
    <header className={`w-full bg-gradient-to-r from-[#E04848] to-[#a83279] text-white shadow-md`}>
      <div className="max-w-7xl mx-auto px-4 py-2 flex flex-col md:flex-row items-center justify-between gap-2 md:gap-0">
        {/* Left: Logo & Brand */}
        <div className="flex items-center gap-3 flex-shrink-0 cursor-pointer" onClick={() => navigate('/contact-us')}>
          <img src={logo} alt="GoBus Logo" className="w-10 h-10 rounded-lg bg-white p-1" />
          <span className="text-xl font-bold tracking-wide">GoBus</span>
        </div>

        {/* Center: Social & Contact */}
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6 text-sm">
          {/* Socials */}
          <div className="flex gap-2">
            <a href="https://www.facebook.com/profile.php?id=100012521027764" aria-label="Facebook" className="bg-white/20 hover:bg-white/40 p-2 rounded-full transition"><FaFacebookF /></a>
            <a href="#" aria-label="Instagram" className="bg-white/20 hover:bg-white/40 p-2 rounded-full transition"><FaInstagram /></a>
            <a href="#" aria-label="YouTube" className="bg-white/20 hover:bg-white/40 p-2 rounded-full transition"><FaYoutube /></a>
            <a href="#" aria-label="WhatsApp" className="bg-white/20 hover:bg-white/40 p-2 rounded-full transition"><FaWhatsapp /></a>
          </div>
          {/* Contact */}
          <div className="flex items-center gap-4 text-xs md:text-sm">
            <span className="flex items-center gap-1"><FaPhoneAlt /> 01-5970798</span>
            <span className="flex items-center gap-1"><FaPhoneAlt /> 014115951</span>
            <span className="flex items-center gap-1"><FaUser /> <a href="mailto:info@gobus.com" className="underline hover:text-white/80">info@gobus.com</a></span>
          </div>
        </div>

        {/* Right: Navigation & Theme Toggle */}
        <div className="flex items-center gap-4 mt-2 md:mt-0">
          <nav className="hidden md:flex gap-4 text-sm font-medium">
            <a href="/" className="hover:underline">Home</a>
            <Link to="/contact-us" className="hover:underline">Contact</Link>
            <a href="/FAQ" className="hover:underline">FAQ</a>
          </nav>
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="flex items-center gap-1 bg-white/20 hover:bg-white/40 px-3 py-1 rounded-full transition focus:outline-none"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <MdLightMode className="text-yellow-300" />
            ) : (
              <MdDarkMode className="text-gray-200" />
            )}
            <span className="hidden sm:inline">{isDarkMode ? "Light" : "Dark"} Mode</span>
          </button>
        </div>
      </div>
      {/* Mobile Nav */}
      <nav className="flex md:hidden justify-center gap-4 pb-2 text-sm font-medium">
        <a href="/" className="hover:underline">Home</a>
        <Link to="/contact-us" className="hover:underline">Contact</Link>
        <a href="/FAQ" className="hover:underline">FAQ</a>
      </nav>
    </header>
  );
};

export default Header;
