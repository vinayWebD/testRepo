import React from 'react';
import Arrow from '../Icons/Arrow';

const Pagination = ({ active = 1 }) => {
  return (
    <>
      <nav aria-label="Page navigation example" className="text-right">
        <ul className="inline-flex  flex gap-2 -space-x-px text-sm">
          {[1, 2].map((item) => (
            <li
              key={item}
              className={`${item === active ? 'bg-[#0071BC]' : 'bg-[#EDEDED]'}  rounded-3xl `}
            >
              <a
                href="#"
                className="flex items-center justify-center px-2.5 h-8 leading-tight text-gray-500 bg-[greylight] mr-1 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                {item}
              </a>
            </li>
          ))}
          <li className="bg-[#EDEDED]  rounded-3xl">
            <a
              href="#"
              className="flex items-center justify-center px-2.5 h-8 leading-tight text-gray-500 bg-[greylight] mr-1 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <Arrow />
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Pagination;
