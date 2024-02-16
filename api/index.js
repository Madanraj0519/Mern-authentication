const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
dotenv.config();

const PORT = 3000;


mongoose.connect(process.env.MONGO_DB).then(() => {
    console.log('Database connection established successfully');
}).catch((err) => { console.log(err); });

app.use(express.json());
app.use(cookieParser());

app.use('/api/user', require('./routes/user.route'));
app.use('/api/auth', require('./routes/auth.route'));


app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});


//handling errors
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error'
    return res.status(statusCode).json({
        success : false,
        message,
        statusCode
    })
})
