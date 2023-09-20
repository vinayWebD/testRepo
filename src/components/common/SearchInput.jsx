import SearchIcon from '../Icons/SearchIcon';

const SearchInput = ({
  value = '',
  onChange = () => {},
  placeholder = 'Search',
  className = '',
  disabled = false,
}) => {
  return (
    <div className="flex flex-col">
      <div className="flex relative items-stretch">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`placeholder:text-white pr-0 search bg-[transparent] border-white border-[1px] border-r-0 rounded-r-none text-white text-[12px] ${className}`}
          disabled={disabled}
        />
        <div className="border-white border-[1px] border-l-0 flex items-center px-[10px] rounded-r-[8px]">
          <SearchIcon />
        </div>
      </div>
    </div>
  );
};

export default SearchInput;
