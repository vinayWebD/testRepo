import LoginBg from '../assets/images/login-bg.svg';
import LoginBottomBg from '../assets/images/login-bottom-bg.svg';
import Logo from '../assets/images/logo.svg';

function LoginPage() {
  return (
    <div className="flex justify-start items-start h-[100vh] relative sm:flex-col sm:flex-wrap">
      <div className=" bg-darkblue md:h-[100vh] md:w-[50%] sm:w-[100%]">
        <div className="pt-[60px] px-[60px]">
          <h2 className="text-white">
            Your authentic career platform that helps you find your true purpose.
          </h2>
        </div>
        <img src={LoginBg} alt="Login" className="w-[80%]" />
      </div>
      <div className="flex flex-col items-center justify-center md:h-[100vh] md:w-[50%] sm:w-[100%] bg-gradient-to-b from-gradientfrom to-gradientto">
        <div className="pt-[60px] px-[60px]">
          <img src={Logo} alt="logo" />
        </div>
        <h1 className="text-white">Welcome Back</h1>
        <h4>Let’s build something great together!</h4>
      </div>
      <img src={LoginBottomBg} alt="login-bottom" className="absolute bottom-0 left-0" />
    </div>
  );
}

export default LoginPage;
