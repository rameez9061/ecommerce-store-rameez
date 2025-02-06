import Stripe from 'stripe';





if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("Stripe secret key is not set");
}

console.log("STRIPE_SECRET_KEY just before creating stripe:", process.env.STRIPE_SECRET_KEY);
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY,{
    apiVersion:"2025-01-27.acacia"
});


console.log("after everything")

export default stripe;
