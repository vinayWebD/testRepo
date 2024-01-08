import SearchIcon from '../Icons/SearchIcon';

const FilterSearch = ({
  value = '',
  onChange = () => {},
  placeholder = 'Search',
  onBlur = () => {},
  onFocus = () => {},
  disabled = false,
  iconColor = '#A1A0A0',
  isAutoFocus = false,
}) => {
  return (
    <div className="flex flex-col">
      <div className={'flex relative items-stretch gap-0 bg-[#F2F2F2] border-0'}>
        <div className="flex items-center px-[5px] ml-4">
          <SearchIcon color={iconColor} />
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          onBlur={onBlur}
          onFocus={onFocus}
          className={'text-black font-montserrat text-base font-normal text-[14px] bg-[#F2F2F2]'}
          disabled={disabled}
          autoFocus={isAutoFocus}
        />
      </div>
    </div>
  );
};

export default FilterSearch;
