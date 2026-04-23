import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Product from '../../components/slideProducts/Product';
import './categoryPage.css'
import SlideProductLoading from '../../components/slideProducts/SlideProductLoading';
import PageTransation from '../../components/PageTransation';

const CategoryPage = () => {
    const { slug: category } = useParams();
    const [categoryProducts, setCategoryProducts] = useState([]);
    const [loading, setLoading] = useState( true);
    useEffect(() => {
        fetch(`https://dummyjson.com/products/category/${category}`)
        .then((res) => res.json())
        .then((data) => {
            setCategoryProducts(data.products)
            setLoading(false)

        }).catch((error) => {
            console.log(error)
            setLoading(false)
        })

        }, [category])
    console.log(categoryProducts)
    return (
        <PageTransation>
        <div className="category_products">

            {loading ? <SlideProductLoading  key={category} /> :
            <div className="container">
                <div className="top_slide">
                    <h2>{category}</h2>
                </div>
                <div className="products">
                    {categoryProducts?.map((item, index) => (
                        <Product key={index} item={item} />
                    ))}
                </div>
            </div>
            }



            
        </div>
        </PageTransation>
    )
}

export default CategoryPage;