const express = require("express");
const app = express();
const router = express.Router();
app.use(express.json());
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
app.use(cors());

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dsdtmsuyq",
  api_key: "689374949646221",
  api_secret: "MZ1i4_b7jHvXptJoTljgFIjHV8k",
  secure: true,
});

var storage = multer.diskStorage({
  destination: function (req, file, callBack) {
    callBack(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + ".jpg");
  },
});
const upload = multer({ storage: storage });
router.post("/file", upload.single("avatar"), async (req, res) => {
  cloudinary.uploader.upload(req.file.path).then(result => {
    const { url, secure_url } = result;
    // save in db
    //  { result}
    fs.unlink(`${req.file.path}`, err => {
      console.log(err);
    });
  });

  res.json({
    message: "file uploaded",
  });
});

app.use(router);
app.listen(3000, () => {
  console.log("server started to receive files");
});
