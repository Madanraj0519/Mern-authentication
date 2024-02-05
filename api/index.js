const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();


const PORT = 5000;


mongoose.connect(process.env.MONGO_DB).then(() => {
    console.log('Database connection established successfully');
}).catch((err) => { console.log(err); });


app.use('/api/users', require('./routes/user.route'));


app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
