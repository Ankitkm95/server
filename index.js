const express = require("express");
const cors = require("cors");

const { userRouter } = require("./routes/users.routes");
const { connectiontodb } = require("./config/db");



require('dotenv').config();
const app = express();

app.use(express.json());
app.use(cors());

app.use("/", userRouter);

app.listen(process.env.PORT, async ()=>{
    try {
        await connectiontodb;
        console.log("Connection Established Successfully");
    } catch (err) {
        console.log("Error connecting to DB");
        console.log(err.message);
    }
    console.log(`App is running on port ${process.env.PORT}`);
})



