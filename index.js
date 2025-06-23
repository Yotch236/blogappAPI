const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");

const BlogRouter = require('./routes/blogs');
const userRouter = require('./routes/users');

const app = express();

app.use(cors());

app.use(express.json());

 app.use("/blogs", BlogRouter);
 app.use("/users", userRouter);

mongoose.connect("mongodb+srv://geronimo:admin1234@wdc028-course-booking.aydz0fa.mongodb.net/BlogApp?retryWrites=true&w=majority&appName=WDC028-Course-Booking",{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.once('open', () => console.log("Nakaconnect kana  sa MongoDB"));

if(require.main === module){
    app.listen(process.env.PORT || 4000, () => {
        console.log(`API is now online on port ${process.env.PORT || 4000}`)
    });
}

module.exports = {app, mongoose};
