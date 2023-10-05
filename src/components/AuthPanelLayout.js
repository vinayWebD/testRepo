import AuthGradientBg from '../assets/images/auth-gradient-bg.svg';
import AuthGradientBgSmall from '../assets/images/auth-gradient-bg-small.svg';
import HeroVector from '../assets/images/hero-vector.svg';
import Logo from '../assets/images/logo.svg';
import { LANG } from '../constants/lang';
import useDeviceType from '../hooks/useDeviceType';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { PATHS } from '../constants/urlPaths';

const { LANG_AUTH_PANEL_LAYOUT_HEADING } = LANG.PAGES.AUTH_COMMON;
const { LANDING } = PATHS;

function AuthPanelLayout({ children }) {
  const deviceType = useDeviceType();

  const footerImageContainer = useMemo(() => {
    if (deviceType !== 'desktop') {
      return (
        <img
          src={AuthGradientBgSmall}
          alt="login-bottom"
          className="absolute bottom-0 left-0 w-full h-[45px]"
        />
      );
    } else {
      return (
        <img src={AuthGradientBg} alt="login-bottom" className="absolute bottom-0 left-0 w-full" />
      );
    }
  }, [deviceType]);

  return (
    <div className="flex justify-start min-h-[100vh] w-full sm:flex-wrap relative items-stretch">
      <div className=" bg-darkblue min-h-[100vh] hidden md:pb-4 lg:flex gap-6 lg:w-[50%] w-[100%] flex-col pt-2">
        <div className="pt-[30px] xl:pt-[60px] px-[60px] max-w-[620px]">
          <h2 className="text-white">{LANG_AUTH_PANEL_LAYOUT_HEADING}</h2>
        </div>
        <img src={HeroVector} alt="Login" className="w-[80%] mb-[12%]" />
      </div>

      <div className="flex flex-col justify-normal pb-10 md:pb-20 md:justify-center lg:justify-normal items-center min-h-[100vh] lg:w-[50%] w-[100%] bg-gradient-to-b from-gradientfrom to-gradientto">
        <div className="pt-[30px] md:pt-5 lg:pt-[60px] px-[60px]">
          <Link to={LANDING}>
            <img src={Logo} alt="logo" className="cursor-pointer" />
          </Link>
        </div>
        <div className="md:w-[60%] w-[90%] mt-9 md:mt-14">{children}</div>
      </div>
      {footerImageContainer}
    </div>
  );
}

export default AuthPanelLayout;
