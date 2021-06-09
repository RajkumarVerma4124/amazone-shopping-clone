const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async(req, res) => {
    const { items, email } = req.body;
  
    const transformedItem = items.map(item => ({
        description: item.description,
        quantity: item.quantity,
        price_data: {
            currency: 'gbp',
            unit_amount: item.price * 100,
            product_data: {
                name: item.title,
                images: [item.image]
            },
        }
    }))

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        shipping_rates: ['shr_1Izlz2FqFxnzBwgor4i75qN2'],
        shipping_address_collection: {
            allowed_countries: ['BD', 'GB', 'CA', 'IN', 'NL', 'US']
        },
        line_items: transformedItem,
        mode: 'payment',
        success_url: `${process.env.HOST}/success`,
        cancel_url: `${process.env.HOST}/checkout`,
        metadata: {
            email,
            images: JSON.stringify(items.map(item => item.image)),
            titles: JSON.stringify(items.map(item => item.title))
        }
    })

    res.status(200).json({ id: session.id })

};