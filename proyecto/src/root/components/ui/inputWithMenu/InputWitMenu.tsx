import { useState, useEffect, useRef } from 'react';

const InputWithMenu = () => {
  const [searchText, setSearchText] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const menuRef = useRef<HTMLUListElement>(null);
  //TODO: Refine this logic with a simple foreach or map
  const searchOptions = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5', 'Option 6', 'Option 7', 'Option 8', 'Option 9', 'Option 10'];

  useEffect(() => {
    if (searchText === '') {
      setSuggestions([]);
    } else {
      const filteredSuggestions = searchOptions.filter(option =>
        option.toLowerCase().includes(searchText.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    }
  }, [searchText]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setSuggestions([]);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <input
        type="text"
        value={searchText}
        onChange={handleInputChange}
        className="h-10 pl-5 pr-7 rounded-full text-sm focus:outline-none bg-gray-100 transition-all duration-500 ease-in-out"
        placeholder="Buscar"
      />
      {suggestions.length > 0 && (
        <ul ref={menuRef} className="absolute left-0 mt-10 w-full bg-white rounded-lg shadow-lg max-h-48 overflow-auto z-10">
          {suggestions.map((suggestion, index) => (
            <li key={index} className="p-2 hover:bg-gray-100 cursor-pointer">
              {suggestion}
            </li>
          ))}
        </ul>
      )}
      {suggestions.length > 0 && (
        <style>
          {`
            body {
              overflow: hidden;
            }
          `}
        </style>
      )}
    </div>
  );
}

export default InputWithMenu;
