
import Product from './../../components/slideProducts/Product';
import { FaCartArrowDown } from "react-icons/fa";






const ProductImages = ({ product }) => {
    return (
        <div className="w-full md:w-[40%]">
            <div className="flex items-center justify-center mb-[20px]">
                <img className="max-h-[450px] w-auto" id='big_img' src={product.images && product.images[0]} alt={product.title} />

            </div>
            <div className="flex justify-between cursor-pointer gap-2" >
                {product.images && product.images.map((img, index) => (
                    <img className="w-auto max-h-[150px] object-cover flex-1 min-w-[20%]" key={index} src={img} alt={`${product.title} ${index + 1}`} onClick={
                        () => document.getElementById("big_img").src = img
                    } />
                ))}

            </div>
        </div>
    )
}

export default ProductImages;