import React from 'react';
import Card from './Card';

const Tabs = ({ handleSetTab = () => {}, tabs = ['Tab1', 'Tab2', 'Tab3'], selectedTab }) => {
  return (
    <Card
      classNames="flex justify-around overflow-hidden text-center md:rounded-t-lg min-[320px]:rounded-t-none "
      bottomNotRound={true}
    >
      {tabs.map((tab, i) => (
        <div
          key={i}
          className={` sm:p-4 cursor-pointer min-[320px]:py-5 text-sm ${
            selectedTab === tab
              ? 'border-b-4 border-blueprimary text-blueprimary font-semibold'
              : 'font-medium'
          }`}
          onClick={() => handleSetTab(tab)}
        >
          {tab}
        </div>
      ))}
    </Card>
  );
};

export default Tabs;
