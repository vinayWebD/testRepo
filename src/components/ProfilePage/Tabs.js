import React from 'react';
import Card from '../common/Card';

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
        Posts
      </div>
      <div
        className={`w-[33.3%] p-4 cursor-pointer ${
          tab === 'work' ? 'border-b-4 border-blueprimary text-blueprimary' : ''
        }`}
        onClick={() => updateTab('work')}
        style={{ fontWeight: '500' }}
      >
        Work
      </div>
      <div
        className={`w-[33.3%] p-4 cursor-pointer ${
          tab === 'interest' ? 'border-b-4 border-blueprimary text-blueprimary' : ''
        }`}
        onClick={() => updateTab('interest')}
        style={{ fontWeight: '500' }}
      >
        Interests
      </div>
      <div
        className={`w-[33.3%] p-4 cursor-pointer ${
          tab === 'myself' ? 'border-b-4 border-blueprimary text-blueprimary' : ''
        }`}
        onClick={() => updateTab('myself')}
        style={{ fontWeight: '500' }}
      >
        {other ? 'About Self' : 'Myself'}
      </div>
    </Card>
  );
};

export default Tabs;
