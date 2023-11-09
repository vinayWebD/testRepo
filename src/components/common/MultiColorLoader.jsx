import logo from '../../assets/images/logo.svg';
import './loader.scss';
const MultiColorLoader = () => {
  return (
    <div
      className="flex flex-col items-center justify-center w-full h-[100vh] text-center pointer-events-none"
      style={{ backgroundColor: '#013354' }}
    >
      <div>
        <img src={logo} alt="logo" />
      </div>
      <div className="requestProgress">
        <div className="bar"></div>
      </div>
    </div>
  );
};

export default MultiColorLoader;
