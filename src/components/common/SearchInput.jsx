import SearchIcon from '../Icons/SearchIcon';

const SearchInput = ({
  value = '',
  onChange = () => {},
  placeholder = 'Search',
  className = '',
  disabled = false,
  iconColor = '#ffffff',
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
          className={` ${className}  pl-2 search bg-[transparent] border-0 text-white text-[12px]`}
          disabled={disabled}
          autoFocus={true}
        />
      </div>
    </div>
  );
};

export default SearchInput;
