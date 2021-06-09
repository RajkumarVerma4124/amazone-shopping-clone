import Image from 'next/image'
import { useState } from "react"
import { StarIcon } from '@heroicons/react/solid'
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import { addToBasket } from "../slices/basketSlice";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import {
    EyeIcon,
} from '@heroicons/react/outline'
import QuickView from "./QuickView";
import styles from "../styles/Product.module.css"
import Link from 'next/link'

toast.configure();
function ProductFurniture({ id, title, price, category, description, image, shipping, colors, company, productsFurniture }) {
    const [showQuick, setShowQuick] = useState(false)
    const [added, setAdded] = useState(false)

    const dispatch = useDispatch();
    const MAX_RATING = 5;
    const MIN_RATING = 1;
    const [rating] = useState(
        Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
    );

    const addItemToBasket = () => {
        const product = { id, title, rating, price, category, description, image, shipping, colors, company, quantity: 1}
        // Sending the product  as an action to the REDUX store.. the basket slice 
        dispatch(addToBasket(product))
        setAdded(true)
        setTimeout(() => setAdded(false), 2000)
        
        toast.success(
            <>
                <span className="font-bold">Added to basket..!!!</span>
                <br />
                <span className="font-bold">Title:- </span>
                {product.title.slice(0, 30)}
                {product.title.length > 41 ? "…" : ""}<br />
                <span className="font-bold">Category:- </span>
                {product.category.slice(1, 30)}<br />
                <span className="font-bold">Description:- </span>
                {product.description.slice(1, 30)}
                {product.description.slice(30, 90)}
                {product.description.length > 90 ? "…" : ""}<br />

            </>,
            {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                draggablePercent: 20,
                progress: undefined,
            }
        );
    }

    return (
        <>
                    <div className={"relative flex flex-col m-5 bg-white z-30 p-10 md:transition duration-150 transform hover:scale-105 hover:shadow-lg" }>
                        <p className="absolute top-0 right-0 text-xs-italic p-2 text-gray-400">{category}</p>

                        <div className={`relative  ${styles.product_image_wrapper}`}>
                            <Image className={"cursor-pointe overflow-hidden w-full " + styles.loop_product_image} loading="lazy" src={image} width={800} height={500} objectFit="cover" />
                            <div onClick={() => setShowQuick(true)} className={`cursor-pointer ${styles.product_image_overly}`}>
                                <div className={`button rounded-lg ${styles.product_image_overly_button}`}>
                                    <span>Quick View</span>
                                    <EyeIcon className="h-6" />
                                </div>
                            </div>
                        </div>

                        <Link href={`/product/${id}`}>
                            <h4 title={title} className="cursor-pointer text-gray-800 text-lg my-0.5 font-semibold">{title}</h4>
                        </Link>
                            <h4 className=" text-sm text-gray-500 my-1  ">{company}</h4>

                        <div className="flex">
                            {Array(rating).fill().map((_, index) => (
                                <StarIcon key={index} className="h-5 text-yellow-500" />
                            ))}
                        </div>
                        <p className="text-xs my-2 line-clamp-2">{description}</p>
                        <div className="mb-1">
                            <Currency
                        quantity={price} currency="GBP"
                            />
                        </div>
                        <div className="flex items-center my-4">
                            {colors && colors.map(color => (
                                <div key={Math.random()} className={`w-7 h-7 border-gray-200 border-4 rounded-full mx-1`} style={{ background: color }} />
                            ))}
                        </div>

                        {shipping && (
                            <div className="flex items-center space-x-2 -mt-5">
                                <img className="w-12" src="https://links.papareact.com/fdw" alt="" />
                                <p className="text-xs text-gray-500">Free Next-day delivery</p>
                            </div>
                        )}
                        <button title="Add to cart" onClick={addItemToBasket} className="mt-auto button md:transition duration-150 transform hover:scale-105 hover:shadow-lg">{added ? 'Added' : 'Add to Basket'}</button>
                    </div>
            
            {showQuick && <QuickView setShowQuick={setShowQuick} id={id} productsFurniture={productsFurniture} rating={rating}/>}
        </>
    )
}
export default ProductFurniture
