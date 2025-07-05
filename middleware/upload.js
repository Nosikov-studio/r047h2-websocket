const multer = require('multer')
const moment = require('moment')

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/')

    },
    filename(req, file, cb) {
        const date = moment().format('DDMMYYYY-HHmmss_sss')
        cb(null, `${date}-${file.originalname}`)

    }
})

const types = ['image/png', 'image/jpg', 'image/jpeg']

const fileFilter = (req, file, cb) => {
//    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg'|| file.mimetype === 'image/jpeg') {
if (types.includes(file.mimetype.toLowerCase())) {
         cb(null, true)
    } else {
        cb(null, false)
    }
}

const limits = {
    fileSize: 1024 * 1024 * 5 // 5MB
}

module.exports = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: limits
})