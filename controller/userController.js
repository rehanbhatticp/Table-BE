const express = require("express");
const User = require('../models/user.js');
const router = express.Router();

//...Signup User Information..........
router.post("/signup", async (req, res) => {
  try {
    const { firstname, lastname, phone, email } = req.body;

    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({ error: "This Email-Id already Existed.." });
    }
    //create User......
    const myUser = await User.create({
      firstname,
      lastname,
      phone,
      email,
    });

    res.status(201).json({ myUser});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error while creating user" });
  }
});

//.....Get All Users.......
router.get("/all", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 5;

    const totalUsers = await User.countDocuments(); 
    const totalPages = Math.ceil(totalUsers / limit); // Calculate total pages

    const skip = (page - 1) * limit; // Calculate number of documents to skip

    const allUser = await User.find()
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      users: allUser,
      currentPage: page,
      totalPages: totalPages
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error getting profile" });
  }
});

//.....Update User......
router.put("/update/:id", async (req, res) => {
  try {
    const { firstname, lastname, phone, email } = req.body;
    const updateUser = await User.updateOne(
      { _id: req.params.id },
      { firstname,
       lastname,
       phone ,
       email
      } 
    );
    if (updateUser.Modified === 0) {
      console.log("Error updating data");
    }

    const user = await User.findById({ _id: req.params.id });
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error While Updating User Information" });
  }
});

//..Delete User..........
router.delete("/delete/:id", async (req, res) => {
  try {
    const deleteUser = await User.findByIdAndDelete(req.params.id);
    if (!deleteUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User Deleted Successfully.." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error While Deleting User Information..." });
  }
});

module.exports = router;