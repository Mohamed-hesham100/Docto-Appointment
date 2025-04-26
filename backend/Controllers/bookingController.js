// import User from "../models/UserSchema.js";
// import Doctor from "../models/DoctorSchema.js";
// import Booking from "../models/BookingSchema.js";
// import Stripe from "stripe";
// import dotenv from "dotenv";
// dotenv.config();

// export const getCheckoutSession = async (req, res) => {
//   try {
//     // get currently booked doctor
//     const doctor = await Doctor.findById(req.params.doctorId);
//     const user = await User.findById(req.user);
//     const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//     // create stripe checkout session
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       mode: "payment",
//       success_url: `${process.env.CLIENT_SITE_URL}/checkout-success`,
//       cancel_url: `${req.protocol}://${req.get("host")}/doctors/${doctor.id}`,
//       customer_email: user.email,
//       client_reference_id: req.params.doctorId,
//       line_items: [
//         {
//           price_data: {
//             currency: "usd",
//             unit_amount: doctor.ticketPrice ? doctor.ticketPrice * 100 : 1000,
//             product_data: {
//               name: doctor.name,
//               description: doctor.bio,
//               images: doctor.photo
//                 ? [doctor.photo]
//                 : ["https://via.placeholder.com/150"],
//             },
//           },
//           quantity: 1,
//         },
//       ],
//     });

//     // create new booking
//     const booking = new Booking({
//       doctor: doctor._id,
//       user: user._id,
//       ticketPrice: doctor.ticketPrice,
//       session: session.id,
//       appointmentDate: new Date(),
//     });
//     await booking.save();

//     res
//       .status(200)
//       .json({ success: true, message: "Successfully paid", session });
//   } catch (err) {
//     console.error(err); // عشان تعرف الخطأ بالظبط
//     res
//       .status(500)
//       .json({ success: false, message: "Error Creating Checkout Session" });
//   }
// };

import User from "../models/UserSchema.js";
import Doctor from "../models/DoctorSchema.js";
import Booking from "../models/BookingSchema.js";
import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();

export const getCheckoutSession = async (req, res) => {
  try {
    // get currently booked doctor
    const doctor = await Doctor.findById(req.params.doctorId);
    if (!doctor) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });
    }

    const user = await User.findById(req.user);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    // create stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${process.env.CLIENT_SITE_URL}/checkout-success`,
      cancel_url: `${process.env.CLIENT_SITE_URL}/doctors/${doctor.id}`,

      customer_email: user.email,
      client_reference_id: req.params.doctorId,
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: doctor.ticketPrice
              ? Math.round(doctor.ticketPrice * 100)
              : 1000,
            product_data: {
              name: doctor.name,
              description: doctor.bio,
              images: doctor.photo
                ? [doctor.photo]
                : ["https://via.placeholder.com/150"],
            },
          },
          quantity: 1,
        },
      ],
    });

    // create new booking
    const booking = new Booking({
      doctor: doctor._id,
      user: user._id,
      ticketPrice: doctor.ticketPrice,
      session: session.id,
      appointmentDate: new Date(),
    });
    await booking.save();

    res
      .status(200)
      .json({ success: true, message: "Successfully paid", session });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Error Creating Checkout Session" });
  }
};
