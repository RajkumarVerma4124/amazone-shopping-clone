import Currency from "react-currency-formatter";
import { MinusSmIcon, PlusIcon, StarIcon } from "@heroicons/react/solid";
import Image from "next/image";
import { useState } from "react";
import { useDispatch } from "react-redux";
import QuantityCount from "./QuantityCount";
import { removeFromBasket } from "../slices/basketSlice";

function CheckoutProduct({id, title, price, quantity, description, image, shipping, rating, hasPrime}) {
    const dispatch = useDispatch();
    const total =  price * quantity
    
    const [quantityUp, setQuantityUp] = useState(quantity)

    const removeItemFromBasket = () => {
        dispatch(removeFromBasket({id}));
    }

    return (
        <div className="py-4 sm:grid sm:grid-cols-5 my-16 sm:my-3 md:transition duration-150 transform hover:scale-105 hover:shadow-lg p-7" >
            <div className="text-center sm:text-left">
                <Image
                    src={image}
                    width={200}
                    height={200}
                    objectFit="contain"
                />
            </div>

            {/* Middle */}
            <div className="col-span-3 mx-5 mb-4 sm:mb-0">
                <p className="my-3">{title}</p>
                <div className="flex">
                    {Array(rating).fill().map((_, i) => (
                        <StarIcon key={i} className="h-5 text-yellow-500" />
                    ))}
                </div>
                <p className="text-sm my-2 line-clamp-3">{description}</p>
                <h3 className="text-md text-gray-600 items-center justify-around">
                    Quantity :{" "} <span className="font-bold"> {quantity} {" "} </span>
                    Price :  <span className="font-bold"><Currency quantity={price} currency="GBP" />{" "}</span>
                    Total : <span className="font-bold"><Currency quantity={total} currency='GBP' />{" "}</span>
                </h3>
                

                {hasPrime && (
                    <div className="flex items-center space-x-2">
                        <img loading="lazy" className = "w-12" src="https://links.papareact.com/fdw" alt=""/> 
                        <p className="text-xs text-gray-500">Free Next-day Delivery</p>
                    </div>
                )}

                {shipping && (
                    <div className="flex items-center space-x-2">
                        <img loading="lazy" className = "w-12" src="https://links.papareact.com/fdw" alt=""/> 
                        <p className="text-xs text-gray-500">Free Next-day Delivery</p>
                    </div>
                )}
            </div>

            {/* Buttons on the right of the products */}
            <div className="flex flex-col space-y-2 sm:mx-25 mx-auto my-auto justify-self-end">
                <QuantityCount id={id} dispatch setQuantity={setQuantityUp} quantity={quantityUp} />

                <button onClick={removeItemFromBasket}className="button mt-auto">Remove from Basket</button>
            </div>  
        </div>
    )
}

export default CheckoutProduct
