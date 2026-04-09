import React, { useEffect } from 'react'
import HeroSlider from '../../components/HeroSlider'
import SlideProducts from '../../components/slideProducts/SlideProducts'
import SlideProductLoading from '../../components/slideProducts/SlideProductLoading'
import './home.css'

const categories = [
  "smartphones",
  "mobile-accessories",
  "laptops",
  "tablets",
  "sunglasses",
  "sports-accessories",
];
const Home = () => {
  const [products, setProducts] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const results = await Promise.all(
          categories.map(async (category) => {
            const res = await fetch(
              `https://dummyjson.com/products/category/${category}`
            );
            const data = await res.json();
            return { [category]: data.products };
          })
        );

        const productsData = Object.assign({}, ...results);
        setProducts(productsData);
      } catch (error) {
        console.error("Erorr Fetching", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);



  return (
    <div>
      <HeroSlider />

      {loading ? (
         categories.map((category) => (

        <p style={{ textAlign: "center", fontSize: "24px" }}><SlideProductLoading/></p>
      )))
      : (
        categories.map((category) => (
        <SlideProducts data={products[category]} key={category} title={category.replace("-", " ")} />
      ))
      )}
     
     
    </div>
  )
}

export default Home