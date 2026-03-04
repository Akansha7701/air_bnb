const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { isLoggedIn } = require("../middleware");

// Add / Remove wishlist
router.post("/:id", isLoggedIn, async (req, res) => {

  const listingId = req.params.id;
  const user = await User.findById(req.user._id);

  const exists = user.wishlist.includes(listingId);

  if(exists){
    user.wishlist.pull(listingId);
  }else{
    user.wishlist.push(listingId);
  }

  await user.save();

  res.json({success:true});

});

module.exports = router;