// import Stripe from "stripe";
// import Booking from "../models/BookingSchema.js";
// import dotenv from "dotenv";
// dotenv.config();

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// export const stripeWebhook = async (req, res) => {
//   const sig = req.headers['stripe-signature'];

//   let event;
//   try {
//     event = stripe.webhooks.constructEvent(
//       req.body, // عشان استقبلناه Raw فوق
//       sig,
//       process.env.STRIPE_WEBHOOK_SECRET
//     );
//   } catch (err) {
//     console.error("Webhook signature verification failed:", err.message);
//     return res.status(400).send(`Webhook Error: ${err.message}`);
//   }

//   // لو الحدث هو checkout.session.completed (الدفع تم)
//   if (event.type === 'checkout.session.completed') {
//     const session = event.data.object;

//     try {
//       await Booking.create({
//         doctor: session.metadata.doctorId,
//         user: session.metadata.userId,
//         ticketPrice: session.metadata.ticketPrice,
//         session: session.id,
//         appointmentDate: new Date(),
//       });

//       console.log("Booking Created Successfully After Payment");
//     } catch (err) {
//       console.error("Error creating booking:", err);
//     }
//   }

//   res.status(200).json({ received: true });
// };
