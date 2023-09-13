import AuthGradientBg from '../assets/images/auth-gradient-bg.svg';
import HeroVector from '../assets/images/hero-vector.svg';
import Logo from '../assets/images/logo.svg';

function AuthPanelLayout({ children }) {
  return (
    <div className="flex justify-start items-start h-[100vh] sm:flex-col sm:flex-wrap relative">
      <div className=" bg-darkblue h-[100vh] relative hidden lg:block lg:w-[50%] w-[100%]">
        <div className="pt-[30px] xl:pt-[60px] px-[60px]">
          <h2 className="text-white">
            Your authentic career platform that helps you find your true purpose.
          </h2>
        </div>
        <img src={HeroVector} alt="Login" className="w-[73%] left-0 absolute bottom-[12%]" />
      </div>

      <div className="flex flex-col items-center h-[100vh] lg:w-[50%] w-[100%] bg-gradient-to-b from-gradientfrom to-gradientto">
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
