import React from 'react'
import { useState, useEffect } from 'react';
import './SearchBox.css'

// 
import { FaSearch } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';



const SearchBox = () => {


    const [searchTerm, setSearchTerm] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);


    const navigate = useNavigate();
    const location = useLocation();

    const handelSubmit = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            setShowDropdown(false);
            navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
        }
    }


    useEffect(() => {
        const fetchSuggestions = async () => {
            if (searchTerm.trim() === "") {
                setSuggestions([]);
                return;
            }
            try {
                const res = await fetch(`https://dummyjson.com/products/search?q=${encodeURIComponent(searchTerm)}&limit=5`);
                const data = await res.json();
                setSuggestions(data.products || []);
            } catch (error) {
                console.error("Error fetching suggestions:", error);
            }
        };

        const debounceTimer = setTimeout(() => {
            if (searchTerm.trim() !== "") {
                fetchSuggestions();
                if (location.pathname === '/search') {
                    navigate(`/search?q=${encodeURIComponent(searchTerm)}`, { replace: true });
                }
            } else {
                setSuggestions([]);
                if (location.pathname === '/search') {
                    navigate(`/search?q=`, { replace: true });
                }
            }
        }, 300);
        return () => clearTimeout(debounceTimer);
    }, [searchTerm, location.pathname, navigate]);




    return (
        <div className='searchBox_Container' style={{ position: 'relative' }}>
            <form onSubmit={handelSubmit} className='search_box'>
                <input type="text" name='search' id='search' placeholder='Search For Products' value={searchTerm} autoComplete='off' 
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setShowDropdown(true);
                    }} 
                    onFocus={() => setShowDropdown(true)}
                    onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                />
                <button type='submit'>
                    <FaSearch />
                </button>
            </form>
            {showDropdown && suggestions.length > 0 && (
                <ul className="search_suggestions" style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    width: '100%',
                    backgroundColor: 'white',
                    listStyle: 'none',
                    padding: '0',
                    margin: '5px 0 0 0',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                    borderRadius: '4px',
                    zIndex: 1000,
                    maxHeight: '300px',
                    overflowY: 'auto'
                }}>
                    {suggestions.map((product) => (
                        <li key={product.id}
                            style={{ padding: '10px', cursor: 'pointer', borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center', gap: '10px' }}
                            onClick={() => {
                                setSearchTerm(product.title);
                                setShowDropdown(false);
                                navigate(`/search?q=${encodeURIComponent(product.title)}`);
                            }}>
                            <img src={product.thumbnail} alt={product.title} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                            <div>
                                <h4 style={{ margin: 0, fontSize: '14px', color: '#333' }}>{product.title}</h4>
                                <span style={{ fontSize: '12px', color: '#666' }}>${product.price}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default SearchBox