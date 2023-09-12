import React, { useState } from 'react';
import './style.scss';
import { NavbarLogoIcon } from '../Icons/NavbarLogoIcon';
import { NormalButton, TransparentButton } from '../Button';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="lg:px-[128px] md:px-[60px] px-4 py-4 navbar-wrap">
      <div className="container mx-auto">
        <div className="flex justify-between">
          <div>
            <a href="#" className="text-white text-lg font-bold">
              <NavbarLogoIcon />
            </a>
          </div>
          <div className="hidden md:block">
            <div className="flex items-center lg:gap-[50px] md:gap-4">
              <div className="flex items-center lg:gap-[50px] md:gap-4 uppercase">
                <a href="#" className="text-white">
                  Feature
                </a>
                <a href="#" className="text-white ">
                  Promotions
                </a>
                <a href="#" className="text-white ">
                  About Us
                </a>
                <a href="#" className="text-white ">
                  Contact
                </a>
              </div>
              <div className="flex  items-center gap-6">
                <TransparentButton label="Signup" />
                <NormalButton label="Login" />
              </div>
            </div>
          </div>
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
              ☰
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden mt-4">
            <a href="#" className="text-white px-2">
              Feature
            </a>
            <a href="#" className="text-white px-2">
              Promotions
            </a>
            <a href="#" className="text-white px-2">
              About Us
            </a>
            <a href="#" className="text-white px-2">
              Contact
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
