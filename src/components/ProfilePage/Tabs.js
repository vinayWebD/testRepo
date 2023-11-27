import React from 'react';
import Card from '../common/Card';
import postIcon from '../../assets/images/postIcon.svg';
import workIcon from '../../assets/images/workIcon.svg';
import interestIcon from '../../assets/images/interestIcon.svg';
import myselfIcon from '../../assets/images/myselfIcon.svg';

const Tabs = ({ tab = '', updateTab = () => {}, other = false }) => {
  return (
    <Card classNames="flex justify-around overflow-hidden text-center" bottomNotRound={true}>
      <div
        className={`w-[33.3%] p-4 cursor-pointer ${
          tab === 'post' ? 'border-b-4 border-blueprimary text-blueprimary' : ''
        }`}
        onClick={() => updateTab('post')}
        style={{ fontWeight: '500' }}
      >
        <span className="block md:hidden flex items-center justify-center">
          <img src={postIcon} alt="postIcon" />
        </span>
        <span className="hidden md:flex items-center justify-center">Posts</span>
      </div>
      <div
        className={`w-[33.3%] p-4 cursor-pointer ${
          tab === 'work' ? 'border-b-4 border-blueprimary text-blueprimary' : ''
        }`}
        onClick={() => updateTab('work')}
        style={{ fontWeight: '500' }}
      >
        <span className="block md:hidden flex items-center justify-center">
          <img src={workIcon} alt="workIcon" />
        </span>
        <span className="hidden md:flex items-center justify-center">Work</span>
      </div>
      <div
        className={`w-[33.3%] p-4 cursor-pointer ${
          tab === 'interest' ? 'border-b-4 border-blueprimary text-blueprimary' : ''
        }`}
        onClick={() => updateTab('interest')}
        style={{ fontWeight: '500' }}
      >
        <span className="block md:hidden flex items-center justify-center">
          <img src={interestIcon} alt="interestIcon" />
        </span>
        <span className="hidden md:flex items-center justify-center">Interests</span>
      </div>
      <div
        className={`w-[33.3%] p-4 cursor-pointer ${
          tab === 'myself' ? 'border-b-4 border-blueprimary text-blueprimary' : ''
        }`}
        onClick={() => updateTab('myself')}
        style={{ fontWeight: '500' }}
      >
        <span className="block md:hidden flex items-center justify-center">
          <img src={myselfIcon} alt="myselfIcon" />
        </span>
        <span className="hidden md:flex items-center justify-center">
          {other ? 'About Self' : 'Myself'}
        </span>
      </div>
    </Card>
  );
};

export default Tabs;
