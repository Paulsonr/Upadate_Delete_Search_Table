import React from "react";
const Search = ({ search }) => {
  return (
    <div>
      SEARCH : <input type="text" onChange={(e) => search(e.target.value)} />
    </div>
  );
};
export default Search;
