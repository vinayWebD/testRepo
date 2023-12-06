import React, { } from 'react';

const PersonalInfoTabs = ({ tabItems }) => {

  return (
    <div className="w-full">
      <div className="flex overflow-x-auto whitespace-nowrap bg-lightbluebg lg:px-[70px]">
        {tabItems.map((item) => (
          <button
            key={item.label}
            onClick={() => {
              item.redirect()
            }}
            className={`py-[13px] grid md:flex justify-center items-center focus:outline-none w-full transition duration-300 ease-in-out transform ${item.activeTab === item.label ? 'bg-blueprimary tab-title' : 'tab-title-active'
              }`}
          >
            <span className="md:mr-2 flex justify-center">{item.activeTab === item.label ? item.icon : item.blackicon}</span>
            <span className="flex">{item.label}</span>
          </button>
        ))}
      </div>
      <div>
      </div>
    </div>
  );
};

export default PersonalInfoTabs;
