const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./db/connection.js');
const userRoutes= require('./controller/userController.js')
// const cors = require('cors');
// const router = require('./routes/userroute.js');

dotenv.config();

const app = express();
// app.use(cors());
const port = process.env.PORT;
const DataBaseUrl = process.env.DataBaseUrl;

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// app.use('/', router);

//connecting DB................
connectDB(DataBaseUrl);

app.listen(port, () => {
    console.log(`Listening Request and response at http:\\localhost:${port}`);
});

app.use("/user", userRoutes);




