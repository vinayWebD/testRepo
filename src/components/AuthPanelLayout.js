import AuthGradientBg from '../assets/images/auth-gradient-bg.svg';
import HeroVector from '../assets/images/hero-vector.svg';
import Logo from '../assets/images/logo.svg';
import { LANG } from '../constants/lang';

const { LANG_AUTH_PANEL_LAYOUT_HEADING } = LANG.PAGES.AUTH_COMMON;

function AuthPanelLayout({ children }) {
  return (
    <div className="flex justify-start min-h-[100vh] w-full sm:flex-wrap relative items-stretch">
      <div className=" bg-darkblue min-h-[100vh] hidden lg:flex lg:w-[50%] w-[100%] flex-col justify-between pt-2">
        <div className="pt-[30px] xl:pt-[60px] px-[60px]">
          <h2 className="text-white">{LANG_AUTH_PANEL_LAYOUT_HEADING}</h2>
        </div>
        <img src={HeroVector} alt="Login" className="w-[80%] left-0 mb-[12%]" />
      </div>

      <div className="flex flex-col items-center min-h-[100vh] lg:w-[50%] w-[100%] bg-gradient-to-b from-gradientfrom to-gradientto">
        <div className="pt-[30px] xl:pt-[60px] px-[60px]">
          <img src={Logo} alt="logo" />
        </div>
        <div className="md:w-[60%] w-[90%] mt-9 md:mt-14">{children}</div>
      </div>
      <img src={AuthGradientBg} alt="login-bottom" className="absolute bottom-0 left-0" />
    </div>
  );
}

export default AuthPanelLayout;
