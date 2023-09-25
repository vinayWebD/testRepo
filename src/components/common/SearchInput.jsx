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
      <div className="flex relative items-stretch gap-0 border-white border-b-[1px] border-0">
        <div className="flex items-center px-[5px]">
          <SearchIcon />
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`placeholder:text-white pl-2 search bg-[transparent] border-0 text-white text-[12px] ${className}`}
          disabled={disabled}
        />
      </div>
    </div>
  );
};

export default SearchInput;
