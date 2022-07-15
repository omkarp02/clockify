import mongoose from "mongoose";
import Grid from "gridfs-stream";
import path from "path";
import crypto from "crypto";
import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";

//connneting to database with gridfs
var conn = mongoose.createConnection("mongodb://localhost:27017/clockify");
// export let gfs;
// conn.once("open", function () {   
//   gfs = Grid(conn.db, mongoose.mongo);
//   gfs.collection("uploads");
// });


export let gfs, gridfsBucket;
conn.once('open', () => {
 gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
 bucketName: 'uploads'
});

 gfs = Grid(conn.db, mongoose.mongo);
 gfs.collection('uploads');
})

// create storage

let storage = new GridFsStorage({
  url: "mongodb://localhost:27017/clockify",
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "uploads",
        };
        resolve(fileInfo);
      });
    });
  },
});

export const upload = multer({ storage }).single("avatar");