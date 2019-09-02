
const User = require('../models/User')
const {loginValidation, registerValidation } = require('../validations/UserValidation')

const crypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = {
    async login(req, res)
    {
        const { email, password} = req.body

        const {error} = loginValidation(req.body)
        if(error) return res.status(400).send({"error": error.details[0].message})

        const user = await User.findOne({email})
        if(!user) return res.status(400).json({'error': `Email ${email} doesn't exists`})

        const validPass = await crypt.compare(password, user.password)
        if(!validPass) return res.status(400).json({'error': `Password is invalid`})

        //Creating and assign token
        const token = jwt.sign({_id: user._id }, process.env.TOKEN_SECRET)
        res.header('auth-token', token).json({'auth-token': token})
    },

    async register(req, res)
    {
        const {error} = registerValidation(req.body)
        if(error) return res.status(400).send({"error": error.details[0].message})
        //Checking if the user is already on the database
        const { name, email, password} = req.body
        const emailExists = await User.findOne({email})
        if(emailExists) return res.status(400).json({'error': `Email ${email} already exists`})

        //Hashing password
        const salt = await crypt.genSalt(10)
        const hashedPassword = await crypt.hash(password, salt)

        //Creating user
        const user = new User({
            name, email, password: hashedPassword
        })

        try{
            const {_id} = await user.save()
            res.send({'user': _id})
        }catch(err)
        {
            res.status(400).send(err)
        }
    },

    async getLoggedUser(req, res)
    {
        const loggedUser = await User.findById({_id: req.user});
        return res.json(loggedUser);
    },

    async getAllUsers(req, res)
    {
        const users = await User.find({})
        return res.json(users)
    }
}