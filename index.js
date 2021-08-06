const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const path = require("path");

const PORT = process.env.PORT || 8800;

dotenv.config();

//Routes
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const conversationRoute = require("./routes/conversations");
const messageRoute = require("./routes/messages");

//connection

 mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true},() => {
     console.log("Connected to Mongo Atlas");
 });

 app.use("/images", express.static(path.join(__dirname, "public/images")));

 //middlewares
 app.use(express.json());
 app.use(helmet());
 app.use(morgan("common")); 

 //multer upload
 const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/images");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });
  
  const upload = multer({ storage: storage });
  // app.post("/api/upload", upload.single("file"), (req, res) => {
  //   try {
  //     return res.status(200).json("File uploded successfully");
  //   } catch (error) {
  //     console.error(error);
  //   }
  // });

 app.use("/api/users", userRoute);
 app.use("/api/auth", authRoute);
 app.use("/api/posts", postRoute);
 app.use("/api/conversations", conversationRoute);
 app.use("/api/messages", messageRoute);

 

app.listen(PORT, () => {
    console.log("Backend server is running !");
    
}) 