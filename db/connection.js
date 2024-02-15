//const express = require("express");
const mongoose = require("mongoose");
//-------------------------------------------METHOD2--------------------------
const connectDB = async (DataBaseUrl) => {
  try {
    const DbName = {
      dbName: process.env.DBName,
    };
    await mongoose.connect(DataBaseUrl, DbName);
    console.log("Connected Successfully DataBASE......");
  } catch (err) {
    console.log(err);
  }
};
module.exports = connectDB;
// export default connectDB