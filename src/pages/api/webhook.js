import { buffer } from 'micro'
import * as admin from 'firebase-admin'

// Secure a connection to firebase
const serviceAccount = require('../../../permissions.json')
const app = !admin.apps.length ? admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
}) : admin.app()

//Establish connection to Stripe

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const endpointSecret = process.env.STRIPE_SIGNING_SECRET

const fullfillOrder = async(session) => {
    console.log('Fullfilling Order...!!!')

    return app
        .firestore()
        .collection('users')
        .doc(session.metadata.email)
        .collection('orders')
        .doc(session.id)
        .set({
            amount: session.amount_total / 100,
            amount_shipping: session.total_details.amount_shipping / 100,
            images: JSON.parse(session.metadata.images),
            title: JSON.parse(session.metadata.titles),
            timestamp: admin.firestore.FieldValue.serverTimestamp()
        })
        .then(() => {
            console.log(`SUCCESS: Order ${session.id} has been added to DB....!!!`)
        })
}

export default async(req, res) => {
    if (req.method === 'POST') {
        const requestBuffer = await buffer(req);
        const payload = requestBuffer.toString();
        const sig = req.headers["stripe-signature"]

        let event;

        // Verify that the event posted came from stripe)
        // https://stripe.com/docs/connect/webhooks

        try {
            event = await stripe.webhooks.constructEvent(payload, sig, endpointSecret)
        } catch (e) {
            console.log('ERROR', e.message)
            return res.status(400).send(`Webhook error : ${e.message }`)
        }

        // Handle the checkout session completed event
        if (event.type === "checkout.session.completed") {
            const session = event.data.object;

            // Fullfill the order...
            return fullfillOrder(session).then(() => res.status(200)).catch(e => res.status(400).send({ message: "Webhook_Error: " + e.message }))
        }
    }
}

export const config = {
    api: {
        bodyParser: false,
        externalResolver: true
    }
}