import React from 'react';
import FilterSidebar from '../sidebarSearch';

const SidebarSearch = () => {
  const data = [
    {
      title: 'Work',
      subtitles: [
        {
          subtitle: 'Career',
          items: ['UIUX Designer', 'Software Engineer'],
        },
        {
          subtitle: 'Experience ',
          items: ['Software Engineer', 'UIUX Designer'],
        },
      ],
    },
    {
      title: 'Work',
      items: ['UIUX Designer', 'Software Engineer'],
      subtitles: [],
    },
  ];
  const mata = [
    {
      title: 'Work',
      items: ['UIUX Designer', ' Engineer'],
      subtitles: [],
    },
  ];

  return (
    <div className="w-72 h-screen rounded-lg bg-white">
      <div
        className="flex justify-between p-4 border-b border-opacity-30 border-gray-400"
        style={{ borderColor: 'rgba(161, 160, 160, 0.3)' }}
      >
        <div className="text-black foSoftwarent-montserrat text-18 font-semibold">Apply Filter</div>
        <div className="">Clear Filter</div>
      </div>
      <FilterSidebar title={data[0]?.title} subtitles={data[0]?.subtitles} />
      <FilterSidebar title={mata[0]?.title} items={mata[0]?.items} />
    </div>
  );
};

export default SidebarSearch;
