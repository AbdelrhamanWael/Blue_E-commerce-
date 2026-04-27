import React from 'react'
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import SlideProducts from '../../components/slideProducts/SlideProducts';
import ProductDetailsLoading from './ProductDetailsLoading';
import SlideProductLoading from '../../components/slideProducts/SlideProductLoading';
import ProductImages from './ProductImages';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import toast from 'react-hot-toast';
import ProductInfo from './ProductInfo';
import { CartContext } from '../../context/CartContext';
import PageTransation from '../../components/PageTransation'

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    const { addToCart } = useContext(CartContext);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loadingRelatedProducts, setLoadingRelatedProducts] = useState(true);
    const handleAddToCart = () => {
        addToCart(product);
        toast.success(
            <div className='toast-wrapper'>
                <img src={product.images[0]} alt="" className='toast-img' />
                <div className="toast-content">
                    <strong>{product.title}</strong>
                    added to cart successfully!
                    <div>
                        <Link to='/cart' className='btn'>View Cart </Link>
                    </div>
                </div>
            </div>
            , {
                position: "top-right",
                duration: 5000,
            }
        )
    };
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
    if (!product) {
        return <div>Product not found</div>
    }
    return (
        <PageTransation key={id}>
            <div>
                {loading ? (
                    <ProductDetailsLoading />
                ) : (
                    <div className='py-[50px]'>
                        <div className='container mx-auto px-4 w-[90%] max-w-[1350px] flex flex-col md:flex-row justify-between items-center gap-[30px] md:gap-0'>
                            <ProductImages product={product} />
                            <ProductInfo product={product} handleAddToCart={handleAddToCart} />
                        </div>
                    </div>
                )}
                {loadingRelatedProducts ? (
                    <SlideProductLoading />
                ) : (
                    <SlideProducts key={product.category} title={product.category.replace("-", " ")} data={relatedProducts} />
                )}

            </div>
        </PageTransation>
    )
}

export default ProductDetails