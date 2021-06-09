import { CheckCircleIcon } from '@heroicons/react/solid';
import React from 'react'
import Header from "../components/Header";
import { useRouter } from 'next/router'
import Head from 'next/head'    


function success() {
    const router = useRouter()

    return (
        <>
        <Head>
            <title>Order successful | Amazon</title>
            <link rel="icon" href="http://pngimg.com/uploads/amazon/amazon_PNG27.png" />
        </Head>
        <div className="bg-gray-100 h-screen">
            <Header/>

            <main className="max-w-screen-lg mx-auto mt-10">
                <div className="flex flex-col p-10 bg-white mt-30 md:transition duration-150 transform hover:scale-105 hover:shadow-lg ">
                    <div className="flex justify-center space-x-2 mb-5">
                        <CheckCircleIcon className="text-green-500 h-10" />
                        <h1 className="text-3xl">Thank you, your order had been confirmed..!!</h1>
                    </div>
                    <p className="text-center p-3">Thank you for shopping with us. We'll send confirmation once your
                    item has shipped, if you like to check the status of your order please press the link below</p>
                    <p className="text-center p-3 text-gray-500 text-sm">By Amazon clone created by Raj Verma 😎😎😎</p>
                        <button onClick={() => router.push('/orders')} 
                            className="button mt-8 md:transition duration-150 transform hover:scale-105 hover:shadow-lg ">
                            Go to my Orders
                        </button>
                </div>
            </main>
        </div>
    </>
    )
}

export default success
