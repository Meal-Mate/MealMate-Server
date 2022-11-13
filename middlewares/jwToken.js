import jwt from 'jsonwebtoken'
import config from '../config.js'
const checkToken = (req, res, next) => {
    let token = req.headers['authorization']
    console.log(token)
    if (token) {
        const tokenBody = token.slice(7)

        jwt.verify(tokenBody, config.key, (err, decoded) => {
            if (err) {
                return res.json({
                    status: false,
                    msg: 'token is invalid',
                })
            } else {
                req.decoded = decoded
                next()
            }
        })
    } else {
        return res.json({
            status: false,
            msg: 'token is not provided ',
        })
    }
}

export default { checkToken: checkToken }
