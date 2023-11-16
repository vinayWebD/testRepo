import React, { useState } from 'react';
import { Transition } from '@headlessui/react';

const Tabs = ({ tabItems }) => {
  const [activeTab, setActiveTab] = useState(tabItems[0].label);

  return (
    <div className="w-full">
      <div className="flex overflow-x-auto whitespace-nowrap bg-lightbluebg lg:px-[70px]">
        {tabItems.map((item) => (
          <button
            key={item.label}
            onClick={() => setActiveTab(item.label)}
            className={`py-[13px] flex justify-center items-center focus:outline-none w-full transition duration-300 ease-in-out transform ${activeTab === item.label ? 'bg-blueprimary tab-title' : 'tab-title-active'
              }`}
          >
            <span className="mr-2">{activeTab === item.label ? item.icon : item.blackicon}</span>
            <span className="hidden md:flex">{item.label}</span>
          </button>
        ))}
      </div>
      <div>
        {tabItems.map((item) => {
          if (item.label !== activeTab) return null;
          return (
            <Transition
              key={item.label}
              show={activeTab === item.label}
              enter="transition-opacity duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div>{item.content}</div>
            </Transition>
          );
        })}
      </div>
    </div>
  );
};

export default Tabs;
