const express = require("express");
const router = express.Router();
const Booking = require("../models/booking");
const { isLoggedIn } = require("../middleware");

// Payment page
router.get("/:bookingId", isLoggedIn, async (req, res) => {

const booking = await Booking.findById(req.params.bookingId)
.populate("listing");

res.render("bookings/payment", { booking });

});


// Dummy payment success
router.post("/:bookingId", isLoggedIn, async (req, res) => {

await Booking.findByIdAndUpdate(req.params.bookingId,{
status:"accepted"
});

req.flash("success","Payment successful 🎉 Booking confirmed");

res.redirect("/bookings/my");

});

module.exports = router;