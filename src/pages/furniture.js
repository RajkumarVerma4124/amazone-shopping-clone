import Image from "next/image"
import { getSession } from "next-auth/client";
import Head from "next/head";
import { useEffect, useState } from "react";
import Banner from "../components/Banner"
import Footer from "../components/Footer"
import Header from "../components/Header"
import ProductFurnitureFeed from "../components/ProductFurnitureFeed"
import { addProducts } from "../slices/basketSlice"
import { useDispatch } from "react-redux";



function furniture({ productsFurniture}) {
    const dispatch = useDispatch()
    const [filteredProducts, setProducts] = useState(productsFurniture);

    const filterProducts = (searchText) => {
        const matchedProducts = productsFurniture.filter((product) =>
            product.name.toLowerCase().includes(searchText.toLowerCase())
        );
        setProducts([...matchedProducts]);
    }
    useEffect(() => {
        dispatch(addProducts(productsFurniture))
    }, [productsFurniture])

    return (
        <div className="bg-gray-100">
        <Head>
            <title>Amazon 2.0</title>
            <link rel="icon" href="http://pngimg.com/uploads/amazon/amazon_PNG27.png" />
        </Head>
            <Header productsFurniture={productsFurniture} onSearchValue={filterProducts}/>
            <main className="max-w-screen-2xl mx-auto">
                {/* Banner */}
                <Banner />
                {/* ProductFeed */}
                {filteredProducts.length > 0 ? (<ProductFurnitureFeed productsFurniture={filteredProducts} />) : (
                    <h1 className="text-center text-2xl py-4 items-center p-10">
                        🙁 No matching products…
                    </h1>
                )}
            </main>
            <Footer />
        </div>
    )
}

export async function getServerSideProps(context) {
    const session = await getSession(context)

    const productsFurniture = await fetch("https://course-api.com/react-store-products").then(
        (res) => res.json()
    );
    return {
        props: {
            productsFurniture, session
        },
    };
}

export default furniture
