import React, { useState } from 'react';
import { Transition } from '@headlessui/react';
import { ChevronDownIcon } from '../Icons/ChevronDownIcon';

const AccordionItem = ({
  title,
  children,
  icon,
  disabled,
  parentClassName = 'bg-white',
  titleClassName = 'text-blueprimary text-[20px] font-medium',
  childClassName = 'px-6',
  mainIcon = () => <ChevronDownIcon />,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`mb-4 ${isOpen ? `rounded-s ${parentClassName} shadow-md` : parentClassName}`}>
      <button
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left py-[17px] px-[24px] focus:outline-none focus:bg-gray-200 flex items-center justify-between"
      >
        <div className="flex items-center">
          {icon ? <span className="mr-4">{icon}</span> : null}
          <span className={titleClassName}>{title}</span>
        </div>
        <div
          className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        >
          {mainIcon()}
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
        <div className={`${childClassName}`}>{children}</div>
      </Transition>
    </div>
  );
};
const Accordion = ({
  items,
  disabled,
  parentClassName,
  titleClassName,
  childClassName,
  mainIcon,
}) => {
  return (
    <div>
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          icon={item.icon}
          disabled={disabled}
          parentClassName={parentClassName}
          titleClassName={titleClassName}
          childClassName={childClassName}
          mainIcon={mainIcon}
        >
          {item.content}
        </AccordionItem>
      ))}
    </div>
  );
};

export default Accordion;
