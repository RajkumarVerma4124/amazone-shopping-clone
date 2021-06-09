import Image from "next/image"
import Head from "next/head";
import Header from "../components/Header"
import Footer from "../components/Footer";
import { useSelector } from "react-redux"
import { selectItems, selectTotal, selectTotalItems } from "../slices/basketSlice"
import CheckoutProduct from "../components/CheckoutProduct"
import Currency from "react-currency-formatter";
import { useSession } from "next-auth/client"
import { ExclamationCircleIcon  } from '@heroicons/react/solid'
import React from "react"
import axios from 'axios'
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from "react"


const stripePromise = loadStripe(process.env.stripe_public_key);

function Checkout({ productsFurniture, products}) {
    const items = useSelector(selectItems)
    const [session] = useSession();
    const totalPrice = useSelector(selectTotal);
    const selectTotalItem = useSelector(selectTotalItems)
    const [categorys, setCategorys] = useState([])

    const createCheckoutSession = async () => {
        const stripe = await stripePromise

        // Call the backend to create a session
        const checkoutSession = await axios.post('/api/create-checkout-session', {
            items,
            email: session.user.email,
        })

        // Redirect user/customer to stripe checkout
        const result = await stripe.redirectToCheckout({
            sessionId: checkoutSession.data.id
        })

        if (result.error) alert(result.error.message)
        
    }

    useEffect(() => {
        const allCategories = items.map(item => item.category)
        const unique = [...new Set(allCategories)]
        setCategorys(unique)
    }, [items])

    return (
        <div className="bg-gray-100">
            <Head>
                <title>Checkout | Amazon 2.0</title>
                <link rel="icon" href="http://pngimg.com/uploads/amazon/amazon_PNG27.png" />
            </Head>

            <Header products={products} productsFurniture={productsFurniture}/>
            <main className="lg:flex mx-w-screen-2xl mx-auto">
                {/* left */}
                <div className="flex-grow m-5 shadow-sm">
                    <Image 
                    src="https://links.papareact.com/ikj"
                    width ={1020}
                    height ={250}
                    objectFit="contain"
                    className="mx-auto"/>

                    <div className="flex flex-col p-10 space-y-10 bg-white">
                        <h1 className="text-3xl border-b pb-4">{items.length === 0 ? "Your Shopping Basket is empty" : "Your Shopping Basket" }</h1>
                        <div className="mb-5">
                            {!!categorys.length && categorys.map(category => (
                                <>
                                <h1 className="text-xl pb-4 font-medium text-gray-500">
                                    {category}
                                </h1>

                                <div className="mb-14">
                                    {!!items.length && items.filter(item => item.category === category).map(item => 
                                        <CheckoutProduct 
                                        key={item.id} 
                                        id={item.id}
                                        title={item.title}
                                        price={item.price}
                                        quantity={item.quantity}
                                        description={item.description}
                                        image={item.image}
                                        shipping={item.shipping}
                                        rating={item.rating}
                                        hasPrime={item.hasPrime}    
                                         />
                                    )}
                                </div>
                                </>
                            ))}
                        </div>
                    </div>
                </div>

                {/* right */}
               
                <div className="flex flex-col bg-white p-10 md:transition duration-150 transform hover:scale-105 hover:shadow-lg m-6 ">
                            <h3 className="flex flex-row items-center text-sm text-gray-500 mb-1 -mt-5">
                                <ExclamationCircleIcon className="text-blue-600 mb-8 mr-2" height={50} width={50} />
                                Add ₹100.00 of eligible items to your order to qualify for FREE Delivery
                            </h3> 
                            <h2 className="whitespace-nowrap">Subtotal ({selectTotalItem} items):{" "}
                                <span className="font-bold text-gray-500">
                                    <Currency quantity={totalPrice} currency='GBP'/>
                                </span>
                            </h2>

                            <h3 className="flex flex-row items-center text-sm text-gray-500 my-2">
                            <input className="h-4 w-4 space-x-2 mr-2" type="checkbox"/>
                            This order contains a Gift
                            </h3>

                        <button 
                            onClick={createCheckoutSession}
                            role="link" 
                            disabled={!session} 
                            className={`button mt-2 ${!session && 'from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed'}`}>
                                {!session ? "Sign in to Checkout" : "Proceed to Checkout"}
                            </button>
                </div>
            </main>
            <Footer/>
        </div>
    )
}

export default Checkout

export async function getServerSideProps(context) {
    const productsFurniture = await fetch('https://course-api.com/react-store-products').then(response => response.json())
    const products = await fetch('https://fakestoreapi.com/products').then(response => response.json())


    return {
        props: {
            productsFurniture, products
        }
    }

}
