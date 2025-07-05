const bcrypt = require('bcryptjs')
const jwt = require ('jsonwebtoken')
const User = require('../models/User')
const keys = require ('../config/keys')
const errorHandler = require ('../utils/error-handler')


module.exports.login = async function(req, res) {
    const candidate = await User.findOne({ email: req.body.email})

    if (candidate) {

        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)
        if (passwordResult){
// генерация токена, пароли совпали        
            const token = jwt.sign({
                email: candidate.email,
                userId: candidate._id
            }, keys.jwt, {expiresIn: 60*60}) // второй параметр keys.jwt - секретный ключ

            res.status(200).json({token: `Bearer ${token}`})

        } else {
            res.status(401).json({ message:"пароли не совпадают"})
        }

    } else {
        res.status(404).json({  message: "не найден"})
    }
}

module.exports.register = async function(req, res) {

    const candidate = await User.findOne({email: req.body.email})

    if (candidate) {
        res.status(409).json({ message: "Такой уже есть!!!"})
    } else {
        const salt = bcrypt.genSaltSync(10)
        const password = req.body.password
        const user = new User({
            email: req.body.email,
            password: bcrypt.hashSync(password, salt)
        })

        try {
            await user.save()
            res.status(201).json(user)
        } catch(e) {
            // Обработать ошибку
            errorHandler(res, e)
        }

    }
}