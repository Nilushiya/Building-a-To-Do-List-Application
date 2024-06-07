const bcrypt = require('bcrypt');
const { response } = require('express');
const jwt = require('jsonwebtoken');
const user = require('../Model/User')
const secret_key = 'sdfghgfdasdfghjhtrewqwertyuytrewqaxcvbhuytrewsxcvhytrewasxcvghytrewsxcvbhytrewsxcvghytrewazxcvgtrewazxcvghytrewasxcg'

exports.signup = (req, res) => {
    user.user_signup(req.body)
       .then(response => {
            return res.status(201).json(response)
       }) 
       .catch(err => {
        // console.log(res);
            return res.status(500).json({
                error: 'Signup failed. Please try again later.',
                details: err.message,
            })
       })
}

exports.signin = (req, res) => {
    user.user_signin(req.body)
        .then(async response => {
            if(response.length === 0){
                return res.status(404).json({error: 'mail wrong'})
            }

            if (!req.body.password || !response[0].password) {
                throw new Error('data and hash arguments required');
            }

            const passwordMatch = await bcrypt.compare(req.body.password, response[0].password)

            if(passwordMatch && response[0].is_active === 1 ){
                const token = jwt.sign({"id":response[0].id, "role":response[0].user_type}, secret_key, { expiresIn: '24h' });
                return res.status(200).json({
                    jwtToken:token,
                    message: 'successfully signin'
                })
            }
            else{
                return res.status(401).json({error: 'Invalid credentials.'})
            }

        })
        .catch(err => {
            return res.status(501).json({
                error: 'Signin failed. Please try again.',
                details: err.message,
            })
        })
}