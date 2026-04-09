import React from 'react'
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import { FaStar, FaRegStarHalfStroke } from "react-icons/fa6";
import { FaCartArrowDown, FaRegHeart, FaShare } from "react-icons/fa";
import './productDetails.css'
import SlideProducts from '../../components/slideProducts/SlideProducts';
import ProductDetailsLoading from './ProductDetailsLoading';
import SlideProductLoading from '../../components/slideProducts/SlideProductLoading';


const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loadingRelatedProducts, setLoadingRelatedProducts] = useState(true);



    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`https://dummyjson.com/products/${id}`);
                const data = await res.json();
                setProduct(data);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        }


        fetchProduct();
    }, [id]);


    useEffect(() => {
    if (!product) return;
    fetch(`https://dummyjson.com/products/category/${product.category}`)
      .then((res) => res.json())
      .then((data) => {
        setRelatedProducts(data.products);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoadingRelatedProducts(false));
  }, [product?.category]);




    if (loading) {
        return <ProductDetailsLoading/>
    }
    if (!product) {
        return <div>Product not found</div>
    }



    return (

    <div>
        

        <div className='item_details'>
            <div className='container'>
                <div className="imgs_item">
                    <div className="big_img">
                        <img src={product.images[0]} alt={product.title} />

                    </div>
                    <div className="sm_img">
                        {product.images.map((img, index) => (
                            <img key={index} src={img} alt={`${product.title} ${index + 1}`} onClick={
                                () => document.getElementById("big_img ").src = img
                            } />
                        ))}

                    </div>
                </div>


                <div className="details_item">
                    <h2>{product.title}</h2>
                    <div className="stars">
                        {Array.from({ length: Math.floor(product.rating) }, (_, index) => (
                            // <span key={index}>&#9733;</span>
                            <FaStar key={index} />
                        ))}
                        {product.rating % 1 !== 0 && <FaRegStarHalfStroke />}
                    </div>
                    <p className='price'>$ {product.price.toFixed(2)}</p>

                    <h5>Availability: <span>{product.availabilityStatus}</span></h5>
                    <h5>Brand: <span>{product.brand}</span></h5>
                    <p className='desc'>{product.description}</p>
                    <h5><span>Hurry Up! Only {product.stock} products left in stock .</span> </h5>
                    <button className='btn'>
                        <FaCartArrowDown /> Add to Cart
                    </button>

                    <div className="icons">
                        <span><FaRegHeart /></span>
                        <span><FaShare /></span>
                    </div>




                </div>
            </div>
        </div> 

        {loadingRelatedProducts ? (
            <SlideProductLoading/>
        ) : (
            <SlideProducts key={product.category} title={product.category.replace("-", " ")} data={relatedProducts} />
        )}
    </div>
    )
}

export default ProductDetails