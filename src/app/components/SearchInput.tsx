import React, { useState } from "react";

const SearchIcon = () => (
  <svg
    aria-hidden="true"
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    ></path>
  </svg>
);

type Props = {
  onSearch: (city: string) => void;
};

const SearchInput = ({ onSearch }: Props) => {
  const [city, setCity] = useState("");

  const handleSearch = () => {
    onSearch(city);
  };

  return (
    <div className="search">
      <input
        type="search"
        id="city"
        placeholder="Search city"
        autoComplete="off"
        autoCorrect="off"
        onChange={(e) => setCity(e.target.value)}
      />
      <button type="button" onClick={handleSearch}>
        <SearchIcon />
      </button>
    </div>
  );
};

export default SearchInput;
