import React from "react";

const SearchBar = () => {
    return (
      
      <div>
       <p>
   Does this really work?
       </p>

       <form>
        <label htmlFor="search">Search: </label>
        <input type="text" name="search" placeholder="Keyword" />
    
        <input type="submit" value="Submit" />
       </form>

      </div>
       
    );

    };

export default SearchBar;