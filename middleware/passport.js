const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const mongoose = require('mongoose')
const User = mongoose.model('users')
const keys = require('../config/keys')

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // берем токен из хэдеров
    secretOrKey: keys.jwt // наш секретный ключ для проверки подлинности токена
}

module.exports = passport => {
    passport.use(
        new JwtStrategy(options, async (payload, done) =>{
            const user = await User.findById(payload.userId).select('email id')
            try {
            
                if(user) {
                done(null, user)   // null - ошибок нет , такой пользователь найдет в бд
            } else {
                done(null, false)
            }
            } catch(e) {
                console.log(e)
            }


        })
    )
}