import React, { useState } from 'react'
import data from "../utils/data.json";
import Analytics from './Analytics';

const companiesList = Object.keys(data);

const SearchBar = () => {
    const [query, setQuery] = useState("");
    const [company, setCompany] = useState(companiesList[0]);
    const [searchResult, setSearchResult] = useState([]);

    function handleSearchItem() {
        const selectedCompany = data[company];
        const products = [];
        selectedCompany.map((val) => {
            products.push(val.item);
        })
        const filteredProducts = products.filter(prod => {
            return prod.toLowerCase().startsWith(query.toLowerCase());
        })
        setSearchResult(filteredProducts)
    }
    function handleOptionChange(currValue) {
        setCompany(currValue);
        setSearchResult([]);
    }
    return (
        <>
            <div className='search-container'>
                <input type="text" className='input-bar' placeholder="Search for any item" value={query} onChange={(e) => setQuery(e.target.value)} />
                <div className="dropdown">
                    <select value={company} onChange={(e) => handleOptionChange(e.target.value)}>
                        {companiesList.map((option, index) => (
                            <option key={index} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className='search-wrapper'>
                <button className='search-btn' onClick={handleSearchItem}>Search</button>
            </div>
            <div className='result-analytics-container'>
                <div className='result-container'>
                    <h1>Search Results:-</h1>
                    {searchResult.length === 0 && query.length !== 0 ? <p>No items found</p> :
                        searchResult.map((items, idx) => <p key={idx}>{items}</p>)}
                </div>
                <Analytics allProducts={data[company]} />
            </div>
        </>
    )
}

export default SearchBar