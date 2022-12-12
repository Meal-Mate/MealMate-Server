const path = require('path')

module.exports = function (root) {
    return function (req, res) {
        const aasa = path.join(root, 'apple-app-site-association')

        res.set('Content-Type', 'application/pkcs7-mime')
        res.status(200)
        res.sendFile(aasa)
    }
}
