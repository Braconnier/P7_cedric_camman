// import de multer
const multer = require('multer');
// nanoid : A tiny, secure, URL-friendly, unique string ID generator for JavaScript: https://github.com/ai/nanoid#readme
const nanoid = require('nanoid');


// tableau des types MIME pour multer
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg',
    'image/png': 'png',
    'image/gif': 'gif',
    'image/webp': 'webp'
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'files');
    },
    filename: (req, file, callback) => {
        const name = nanoid.nanoid();
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + '_' + Date.now() + '.' + extension);
    }
});

module.exports = multer({ storage: storage }).single('file');