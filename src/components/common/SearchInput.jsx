import SearchIcon from '../Icons/SearchIcon';

const SearchInput = ({
  value = '',
  onChange = () => {},
  placeholder = 'Search',
  onBlur = () => {},
  onFocus = () => {},
  isFocusIn,
  className = '',
  disabled = false,
  textColor = 'text-white',
  color = 'white',
}) => {
  return (
    <div className={`${isFocusIn ? 'min-[320px]:w-full' : ''} flex flex-col`}>
      <div className="flex relative items-stretch gap-0 border-white border-b-[1px] border-0">
        <div className="flex items-center px-[5px] text-black">
          <SearchIcon color={color} />
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          onBlur={onBlur}
          onFocus={onFocus}
          className={`placeholder:text-black pl-2 search bg-[transparent] border-0 ${textColor} text-[12px] ${className}`}
          disabled={disabled}
        />
      </div>
    </div>
  );
};

export default SearchInput;
