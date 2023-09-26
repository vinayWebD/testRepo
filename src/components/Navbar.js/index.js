import React, { useState } from 'react';
import { Link } from 'react-scroll';
import { NavbarLogoIcon } from '../Icons/NavbarLogoIcon';
import { NormalButton, TransparentButton } from '../Button';
import { PATHS } from '../../constants/urlPaths';
import { useNavigate } from 'react-router';
import { MobileLogo } from '../Icons/MobileLogo';
import { PurdrivenText } from '../Icons/PurdrivenText';
import { HamburgerIcon } from '../Icons/HamburgerIcon';
import { CloseIcon } from '../Icons/CloseIcon';
import { TabLogo } from '../Icons/TabLogo';
const { PATH_SIGNUP = '', LOGIN = '' } = PATHS;
import './style.scss';

function Navbar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <div className="max-[768px]:hidden min-[770px]:block lg:xl-[128px] lg:px-[48px] md:px-[36px] md:py-2 navbar-wrap">
        <div className="container mx-auto">
          <div className="flex justify-between cursor-pointer">
            <div>
              <Link
                to="home"
                spy={true}
                smooth={true}
                offset={-100}
                className="text-white text-lg font-bold hidden md:block"
              >
                <NavbarLogoIcon />
              </Link>
              <Link
                to="home"
                spy={true}
                smooth={true}
                offset={-100}
                className="text-white text-lg font-bold mi-[769]:block hidden cursor-pointer"
              >
                <TabLogo />
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="flex items-center lg:gap-[50px] md:gap-4">
                <div className="flex items-center lg:gap-[50px] md:gap-4 uppercase">
                  <Link
                    to="ourview"
                    spy={true}
                    smooth={true}
                    offset={-100}
                    className="text-white menu-items cursor-pointer"
                  >
                    Feature
                  </Link>
                  <Link
                    to="about-work"
                    spy={true}
                    smooth={true}
                    offset={-100}
                    className="text-white menu-items cursor-pointer"
                  >
                    About Us
                  </Link>
                  <Link
                    to="contact-us"
                    spy={true}
                    smooth={true}
                    offset={-100}
                    className="text-white menu-items cursor-pointer"
                  >
                    Contact
                  </Link>
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
      <div className="navbar-wrap-mobile max-[768px]:block hidden relative">
        <div className="flex items-center justify-between px-[48px] py-2">
          <div>
            <MobileLogo />
          </div>
          <div>
            <PurdrivenText />
          </div>
          <div className="w-[30px] h-[30px]">
            <span onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <CloseIcon /> : <HamburgerIcon />}
            </span>
          </div>
        </div>
        {isMenuOpen && (
          <div
            className={`absolute right-0 w-64 h-1/3 min-h-[300px] p-4 bg-white ${
              isMenuOpen ? 'translate-y-0 ' : 'translate-y-full'
            }`}
          >
            <div className="px-5 py-3 mobile-menu-items">
              <Link to="ourview" spy={true} smooth={true} offset={-80}>
                Feature
              </Link>
            </div>
            <div className="px-5 py-3 mobile-menu-items">
              <Link to="about-work" spy={true} smooth={true} offset={-20}>
                About Us
              </Link>
            </div>
            <div className="px-5 py-3 mobile-menu-items">
              <Link to="contact-us" spy={true} smooth={true} offset={-50}>
                Contact
              </Link>
            </div>
            <div className="px-4 pt-3">
              <NormalButton label="Login" onClick={() => navigate(LOGIN)} />
            </div>
            <div className="px-4 pt-4 pb-6">
              <NormalButton label="Signup" onClick={() => navigate(PATH_SIGNUP)} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Navbar;
