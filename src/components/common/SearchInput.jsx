import SearchIcon from '../Icons/SearchIcon';

const SearchInput = ({
  value = '',
  onChange = () => {},
  placeholder = 'Search',
  onBlur = () => {},
  onFocus = () => {},
  className = '',
  disabled = false,
  iconColor = '#ffffff',
  textColor = 'text-white',
  bottomBorderColorClass = 'border-white',
}) => {
  return (
    <div className="flex flex-col">
      <div
        className={`flex relative items-stretch gap-0 ${bottomBorderColorClass} border-b-[1px] border-0`}
      >
        <div className="flex items-center px-[5px]">
          <SearchIcon color={iconColor} />
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          onBlur={onBlur}
          onFocus={onFocus}
          className={` ${className} ${textColor} pl-2 search bg-[transparent] border-0 text-black text-[12px]`}
          disabled={disabled}
        />
      </div>
    </div>
  );
};

export default SearchInput;
