import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import PageTransation from './../components/PageTransation';
import SlideProductLoading from './../components/slideProducts/SlideProductLoading';
import Product from './../components/slideProducts/Product';

const SearchResults = () => {
    const query = new URLSearchParams(useLocation().search).get('q');
    const [loading, setLoading] = useState(true);
    const [results, setResults] = useState([]);
    console.log(results);
    useEffect(() => {
        const fetchResults = async () => {
            try {
                const res = await fetch(`https://dummyjson.com/products/search?q=${query}`);
                const data = await res.json();
                setResults(data.products || []); // Assuming the API returns an object with a 'products' array
                // Handle the search results (e.g., update state)
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
            finally {
                setLoading(false);
            }
        }
        if (query && query.trim() !== "") {
            fetchResults();
        } else {
            setLoading(false);
            setResults([]);
        }
    }, [query]);




    return (
        <PageTransation heading={`Search Results for "${query}"`}>

            <div className="category_products">

                {loading ? <SlideProductLoading key={query} /> :
                    results.length > 0 ? (
                        <div className="container">
                            <div className="top_slide">
                                <h2>Search Results for "{query}"</h2>
                            </div>
                            <div className="products">
                                {results.map((item, index) => (
                                    <Product key={index} item={item} />
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="container">
                            <p >No results found for "{query}".</p>
                        </div>
                    ) 
                }




            </div>



        </PageTransation>
    )
}

export default SearchResults