import multer from "multer";
// this acts as a middleware while uploading the files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // this can cause file overwriting but we wont storing for that long it will store mostly in the cloud
  },
});

const upload = multer({ storage });
