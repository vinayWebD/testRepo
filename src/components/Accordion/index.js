import React, { useState } from 'react';
import { Transition } from '@headlessui/react';
import { ChevronDownIcon } from '../Icons/ChevronDownIcon';

const AccordionItem = ({ title, children, icon }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`bg-white mb-4 ${isOpen ? 'accordion-open' : ''}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left py-[17px] px-[24px] focus:outline-none focus:bg-gray-200 flex items-center justify-between"
      >
        <div className="flex items-center">
          {icon ? <span className="mr-4">{icon}</span> : null}
          <span className="form-title-blue">{title}</span>
        </div>
        <div
          className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        >
          <ChevronDownIcon />
        </div>
      </button>
      <Transition
        show={isOpen}
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="px-6">{children}</div>
      </Transition>
    </div>
  );
};
const Accordion = ({ items }) => {
  return (
    <div>
      {items.map((item, index) => (
        <AccordionItem key={index} title={item.title} icon={item.icon}>
          {item.content}
        </AccordionItem>
      ))}
    </div>
  );
};

export default Accordion;
