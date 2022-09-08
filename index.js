const express = require('express');

require('dotenv').config();

const userController = require('./src/controllers/user.controller');

const productController = require('./src/controllers/product.controller');

const connect = require('./src/configs/db');

const {register, login, email} = require('./src/controllers/auth.controller');
 
const app = express();

app.use(express.json()); 

//register
app.post('/register', register)

//login
app.post("/login", login)
app.post("/email", email);




app.use('/users', userController);
app.use("/product", productController);


app.listen(process.env.PORT || 5000, async() => {
    try {
        await connect();
        console.log('Rocking On Port 5000');
    }
    catch(err){
        console.log(err.message);
    }
});