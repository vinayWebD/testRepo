import './style.scss';
import { CloseGrayIcon } from '../Icons/CloseGrayIcon';

export const SkillsChips = ({ label = 'chips', onClick }) => {
  return (
    <span className="bg-whitelight rounded px-[10px] py-[6px] flex items-center justify-between gap-[24px]">
      <span>{label}</span>
      <span className="chips-title cursor-pointer" onClick={onClick}>
        <CloseGrayIcon />
      </span>
    </span>
  );
};
export const SkillsChipsBlue = ({ label = 'chips' }) => {
  return (
    <span className="blue-bg-chips rounded px-[10px] py-[6px] flex items-center justify-between gap-[24px]">
      <span>{label}</span>
    </span>
  );
};
