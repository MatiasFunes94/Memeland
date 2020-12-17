const util = require("util");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: path.join(__dirname, "../public/uploads"),
  filename: (req, file, cb) => {
    const photoUploaded = Date.now() + file.originalname
    cb(null, photoUploaded);
  },
});

multer({
  storage,
  dest: path.join(__dirname, "../public/uploads"),
  limits: { fileSize: 10000000 },
})

var uploadFile = multer({ storage: storage }).single("file");
module.exports = uploadFile;
