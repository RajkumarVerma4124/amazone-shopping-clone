import Header from "../../components/Header"
import Link from 'next/link'
import Image from "next/image"
import { StarIcon } from "@heroicons/react/solid"
import { useState } from "react"
import Currency from 'react-currency-formatter';
import Head from "next/head"
import styles from "../../styles/Product.module.css"
import Footer from "../../components/Footer"
import { useDispatch } from "react-redux"
import { addToBasket } from "../../slices/basketSlice"
import Product from "../../components/Product"
import QuantityCount from "../../components/QuantityCount"


function Details({ productfeed, products }) {
    const dispatch = useDispatch()
    const {rating, title, price, images, description, stock, reviews, category, hasPrime } = productfeed
    
    const [added, setAdded] = useState(false)
    const [quantity, setQuantity] = useState(1)


 

    const addItemToBasket = () => {
        dispatch(addToBasket({ ...productfeed, title: productfeed.title, quantity, image: productfeed.image }))
        setAdded(true)
        setTimeout(() => setAdded(false), 2000)
    }

    return (
        <>
            <Head>
                <title>{title} | Amazon</title>
            </Head>
            <Header products={products} />
            <div className="bg-gray-200 p-10 mb-10">
                <div className="max-w-screen-xl mx-auto">
                    <span className="font-medium"><Link href='/'>Home</Link></span> / <span className="font-medium"><Link href='/product'>Product</Link></span> / <span className="text-yellow-500">{productfeed.title}</span>
                </div>
            </div>
            <main className="max-w-screen-xl mx-auto mt-5">
                <div className="flex flex-wrap">
                    <div className="px-5 mb-7 w-full md:w-7/12">
                        <div className="w-full mb-4">
                            <Image className={"w-full rounded-lg " + styles.product_image} width={400} height={400} objectFit="contain" src={productfeed.image} alt="" />
                        </div>
                    </div>
                    <div className="px-5 mb-10 w-full md:w-5/12">
                        <p className="font-serif text-xl text-black">{category}</p>
                        <h1 className="my-2 text-5xl text-yellow-500 mb-7">{title}</h1>
                        <p className="text-gray-600 text-base mb-5">{description}</p>
                       
                        <p><b>Stock:</b> {stock > 0 ? 'Available in stock' : 'Stock out!'}</p>
                        <p className="text-yellow-500 text-2xl mb-7">
                            <Currency
                                quantity={price}
                            />
                        </p>
                        {hasPrime && (
                            <div className="flex items-center space-x-2">
                                <img className="w-12" src="https://links.papareact.com/fdw" alt="" />
                                <p className="text-xs text-gray-500">Free Next-day delivery</p>
                            </div>
                        )}
                        <QuantityCount setQuantity={setQuantity} quantity={quantity} />

                        <button onClick={addItemToBasket} className="w-full button mt-4">{added ? 'Added' : 'Add to Basket'}</button>
                    </div>
                </div>
            </main>
            <div className="mt-12 bg-gradient-to-t from-gray-100 to-transparent">
                <div className="max-w-screen-2xl mx-auto">
                    <h1 className="text-yellow-500 text-3xl  ml-5 mb-7">Related Projects</h1>
                    <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {products && products.slice(0, 4).map((product) => (
                            <Product products={products} key={product.id} id={product.id} name={product.title} hasPrime={product.hasPrime} price={product.price} description={product.description} category={product.category} image={product.image} />
                        ))}
                    </div>
                </div>
                <Footer />
            </div>

        </>
    )
}

export default Details

export const getStaticPaths = async () => {
    const products = await fetch('https://fakestoreapi.com/products').then(response => response.json())

    const paths = products.map(product => {
        return {
            params: { id: product.id.toString() }
        }
    })

    return {
        paths,
        fallback: false
    }
}

export const getStaticProps = async (context) => {
    const id = context.params.id
    const productfeed = await fetch('https://fakestoreapi.com/products/' + id).then(response => response.json())
    const products = await fetch('https://fakestoreapi.com/products').then(response => response.json())

    return {
        props: { productfeed, products }
    }
}