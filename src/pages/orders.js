import Header from "../components/Header";
import { useRouter } from 'next/router'
import Head from 'next/head'
import db from '../../firebase'
import { getSession, useSession } from 'next-auth/client'
import Order from "../components/Order";



function Orders({ orders }) {
    const [session] = useSession()

    return (
        <>
            <Head>
                <title>Orders | Amazon</title>
                <link rel="icon" href="http://pngimg.com/uploads/amazon/amazon_PNG27.png" />
            </Head>
            <div>
                <Header />
                <main className="max-w-screen-lg mx-auto mt-10 p-10">
                    <h1 className="text-3xl border-b mb-3 pb-2 border-yellow-400">Your orders</h1>
                
                    {session ? (
                        <p>{orders && orders?.length} Orders</p>
                    ) : (
                        <p>Please Sign in to see your orders</p>
                    )}

                    <div className="mt-5 space-y-5">
                        {orders && orders?.map(({ id, amount, amountShipping, items, timestamp, images }) => (
                            <Order 
                                key={id}
                                id={id}
                                amount={amount}
                                amountShipping={amountShipping}
                                items={items}
                                timestamp={timestamp}
                                images={images}
                             />
                        ))}
                    </div>
                </main>
            </div>
        </>
    )
}

export default Orders

export async function getServerSideProps(context) {

    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
    // const moment = require('moment')

    // Get the users login credentials...
    const session = await getSession(context)

    if (!session) {
        return { props: {} }
    }

    // Firebase db
    const stripeOrders = await db.collection('users').doc(session.user.email).collection('orders').orderBy('timestamp', 'desc').get()
    const moment = require('moment')

    // Stripe Orders 
    const orders = await Promise.all(
        stripeOrders.docs.map(async (order) => ({
            id: order.id,
            amount: order.data().amount,
            amountShipping: order.data().amount_shipping,
            images: order.data().images,
            timestamp: moment(order.data().timestamp.toDate()).unix(),
            items: (
                await stripe.checkout.sessions.listLineItems(order.id, {
                    limit: 100
                })
            ).data,
        }))
    )

    return {
        props: {
            orders
        }
    }

    
}