import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import AllFilter from '../../components/AllFilter'
import AllFilteredProduct from '../../components/AllFilteredProduct'
import Header from '../../components/Header'
import { addProducts } from '../../slices/basketSlice'

function Products({ products}) {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(addProducts(products))
    }, [products])
 
    return (
        <>
            <Head>
                <title>All Products | Amazon</title>
            </Head>
            
            <Header products={products}/>

            <div className="bg-gray-200 p-10 mb-10">
                <div className="max-w-screen-xl mx-auto">
                    <span className="font-medium"><Link href='/'>Home</Link></span> / <span className="text-yellow-500">Products</span>
                </div>
            </div>

            <main className="max-w-screen-xl mx-auto mt-5">
                <div className="flex flex-col md:flex-row">
                    <div className="md:w-3/12 w-full mb-5 px-5">
                        <AllFilter />
                    </div>
                    <div className="md:w-9/12 w-full mb-5 px-5">
                        <AllFilteredProduct/>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Products


export const getStaticProps = async (context) => {
    const products = await fetch('https://fakestoreapi.com/products').then(response => response.json())

    return {
        props: { products }
    }
}