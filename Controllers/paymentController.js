import Razorpay from "razorpay";
import dotenv from 'dotenv'
import User from "../Models/userModel.js";
import Orders from "../Models/orderModel.js";
import crypto from 'crypto'
dotenv.config()




const razorpay = new Razorpay({
    key_id: process.env.Razorpay_key_id,
    key_secret: process.env.Razorpay_key_secret,
});

export const payment = async (req, res) => {
    const id = req.params.id
    const user = await User.findById(id).populate({
        path: "cart",
        populate: { path: "productId" }
    })

    if (!user) {
        return res.status(404).json({ messege: 'user not found' })
    }

    if (!user.cart || user.cart.length === 0) {
        return res.status(200).json({ messege: 'your cart is empty ' })
    }

    const amount = user.cart.reduce((total, item) => {
        return total += item.productId.price * item.quantity
    },0)
    console.log(amount,'yyy');
    

    const productNames = user.cart.map(item => item.productId.title).join(', ')
console.log(productNames,'producnames');

    const options = {
        amount: amount * 100, // amount in the smallest currency unit
        currency: 'INR',
        receipt: `receipt_order_${Math.random().toString(36).substring(2, 15)}`,
        notes: {
            product: productNames,
            userid: id
        }

    };

    const order = await razorpay.orders.create(options);
    res.json(order)
}

export const verifyPayment = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const hmac = crypto.createHmac('sha256', process.env.Razorpay_key_secret);
    hmac.update(razorpay_order_id + '|' + razorpay_payment_id);
    const generatedSignature = hmac.digest('hex')

    console.log(generatedSignature,'genreted signatre');
console.log(razorpay_signature,'razarpay sign');


    if (generatedSignature !== razorpay_signature) {
        return res.status(400).send('verification failed')
    }

    const order = await razorpay.orders.fetch(razorpay_order_id);

    const user = await User.findById(order.notes.userid).populate({
        path: "cart",
        populate: { path: 'productId' }
    })

    const newOrder = new Orders({
        userId: user.id,
        products: user.cart.map(item => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.productId.price
        })),
        amount: order.amount,
        paymentId: razorpay_payment_id,
        orderId: razorpay_order_id,
        totalPrice: order.amount / 100,
        status: 'paid'
    })
    console.log(newOrder,'this is new ordere');
    
    await newOrder.save()
    user.orders.push(newOrder)
    await user.save();

    res.send('payment verified successfully');
}