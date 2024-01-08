import React from 'react';
import SearchLens from '../Icons/SearchLens';
import ExpandIcon from '../Icons/expandIcon';
import { useState } from 'react';
import FilterSearch from '../FilterSearch';
import { Colors } from '../../constants/colors';

const FilterSidebar = ({ title, subtitles = [], items = [] }) => {
  const [itemsState, setItemsState] = useState(false);
  const [itemState, setItemState] = useState(false);
  const [search, setSearch] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const handleSubtitleToggle = (index) => {
    setItemsState((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const searchInputChangeHandler = (value) => {
    setSearchValue(value);
  };

  console.log(search, itemsState);

  return (
    <div className="p-4">
      <div>
        {!search ? (
          <div className="flex justify-between">
            <div className="filter-heading mb-3 mt-4">{title}</div>
            {subtitles.length === 0 ? (
              <div className="flex justify-center items-center space-x-4">
                <div onClick={() => setSearch(true)}>
                  <SearchLens width={28} height={28} />
                </div>
                <div onClick={() => setItemState(!itemState)}>
                  <ExpandIcon width={28} height={28} />
                </div>
              </div>
            ) : null}
          </div>
        ) : (
          <div>
            <FilterSearch
              iconColor={Colors.grayDark}
              onChange={searchInputChangeHandler}
              value={searchValue}
              textColor="text-black"
              isAutoFocus={true}
            />
          </div>
        )}
        <ul>
          {subtitles.length ? (
            subtitles.map((subtitleData, subIndex) => (
              <>
                <li key={subIndex}>
                  {!search && itemsState[subIndex] ? (
                    <div className="flex justify-between">
                      <div className="detail-heading mt-3 mb-3">{subtitleData.subtitle}</div>
                      <div className="flex justify-center items-center space-x-4">
                        <div onClick={() => setSearch(true)}>
                          <SearchLens width={28} height={28} />
                        </div>
                        <div onClick={() => handleSubtitleToggle(subIndex)}>
                          <ExpandIcon width={28} height={28} />
                        </div>
                      </div>
                    </div>
                  ) : search && itemsState[subIndex] ? (
                    <div>
                      <FilterSearch />
                    </div>
                  ) : null}

                  {itemsState[subIndex] && (
                    <ul>
                      {subtitleData.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="mb-2 content-style flex justify-between">
                          {item}
                          <input type="checkbox" className="mr-2" />
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
                <div className="border-b border-[#A1A0A0] h-0.5 mt-4"></div>
              </>
            ))
          ) : itemState ? (
            <ul>
              {items.map((item, itemIndex) => (
                <li key={itemIndex} className="mb-2 content-style flex justify-between">
                  {item}
                  <input type="checkbox" className="mr-2" />
                </li>
              ))}
            </ul>
          ) : null}
        </ul>
      </div>
    </div>
  );
};

export default FilterSidebar;
