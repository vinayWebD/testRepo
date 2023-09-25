import React, { useState } from 'react';
import './style.scss';
import { NavbarLogoIcon } from '../Icons/NavbarLogoIcon';
import { NormalButton, TransparentButton } from '../Button';
import { PATHS } from '../../constants/urlPaths';
import { useNavigate } from 'react-router';
import { MobileLogo } from '../Icons/MobileLogo';
import { PurdrivenText } from '../Icons/PurdrivenText';
import { HamburgerIcon } from '../Icons/HamburgerIcon';
import { TabLogo } from '../Icons/TabLogo';
const { PATH_SIGNUP = '', LOGIN = '' } = PATHS;

function Navbar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  return (
    <>
      <div className="max-[769px]:hidden max-[769]:block lg:xl-[128px] lg:px-[48px] md:px-[36px] md:py-4 navbar-wrap">
        <div className="container mx-auto">
          <div className="flex justify-between">
            <div>
              <a href="/" className="text-white text-lg font-bold hidden lg:block">
                <NavbarLogoIcon />
              </a>
              <a href="/" className="text-white text-lg font-bold min-[769]:block hidden">
                <TabLogo />
              </a>
            </div>
            <div className="hidden md:block">
              <div className="flex items-center lg:gap-[50px] md:gap-4">
                <div className="flex items-center lg:gap-[50px] md:gap-4 uppercase">
                  <a href="#" className="text-white menu-items">
                    Feature
                  </a>
                  {/* <a href="#" className="text-white menu-items">
                    Promotions
                  </a> */}
                  <a href="#" className="text-white menu-items">
                    About Us
                  </a>
                  <a href="#" className="text-white menu-items">
                    Contact
                  </a>
                </div>
                <div className="flex  items-center gap-6">
                  <TransparentButton label="Signup" onClick={() => navigate(PATH_SIGNUP)} />
                  <NormalButton label="Login" onClick={() => navigate(LOGIN)} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="navbar-wrap-mobile max-[768px]:block hidden">
        <div className="flex items-center justify-between px-[48px] py-2">
          <div>
            <MobileLogo />
          </div>
          <div>
            <PurdrivenText />
          </div>
          <div>
            <span onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <HamburgerIcon />
            </span>
          </div>
        </div>
        {isMenuOpen && (
          <div className="block mt-4 text-center pb-2">
            <a href="#" className="text-white px-2">
              Feature
            </a>
            {/* <a href="#" className="text-white px-2">
              Promotions
            </a> */}
            <a href="#" className="text-white px-2">
              About Us
            </a>
            <a href="#" className="text-white px-2">
              Contact
            </a>
          </div>
        )}
      </div>
    </>
  );
}

export default Navbar;
