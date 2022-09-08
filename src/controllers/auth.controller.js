const User = require('../models/user.model');

require('dotenv').config();

const jwt = require('jsonwebtoken');

const newToken = (user) => {
    // console.log(process.env);
    return jwt.sign({ user }, `${process.env.JWT_SECRET_KEY}`);
};



const register = async (req, res) => {
    try{
        //we will try to find the user with the email provided
        let user = await User.findOne({ email: req.body.email }).lean().exec();

        // if the user is found then it is an error
        if(user) return res.status(400).send({ message: "Please try another email"});

        //if user is not found then we will create the user with the email and a password provided
        user = await User.create(req.body);

        //then we will hash the password to make the password more secure

        // then we will create the token for that user
        const token = newToken(user);

        // then return the user and the token




        res.send({user, token});
    }
    catch(err)
    {
        res.status(500).send(err.message);
    }
};


const login = async (req, res) => {
    try{
        //we will try to find the user with the email provided
        const user = await User.findOne({ email: req.body.email });

        // if user is not found then return error
        if( ! user ) return res.status(400).send({ message: "Please try another email or password"});

        //if user is found then we will match the passwords
        const match = user.checkPassword(req.body.password);

        if(! match) return res.status(400).send({ message: "Please try another email or password"});

        // if passwords match then we will create the token 
        const token = newToken(user);

        
        // then return the user and the token
        res.send({ user, token });
    }
    catch(err)
    {
        res.status(500).send(err.message);
    }
};


// for login with email 
const email = async(req, res) => {
    try{
        let user = await User.findOne({email: req.body.email}).lean().exec();

        if(!user) return res.status(400).send("Please try another email or password");

        const token = newToken(user);
        return res.status(200).send({user, token});
    }
    catch(err){
        res.status(500).send({message: err.message});
    }
}

module.exports = {register, login, email};




//hashing => string => hashes it => cannot get the original_string back
//encryption => string => encrypt => encrypted_string => decrypt => original_string