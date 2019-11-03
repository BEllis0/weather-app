import React from 'react';

const SearchBar = () => {

    return (
        <div>
            <form>
                <input id="city" type="text" placeholder="City" />
                <input id="country" type="text" placeholder="Country" />
            </form>
        </div>
    );
};

export default SearchBar;