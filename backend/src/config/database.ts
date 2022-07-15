import mongoose from "mongoose";

const myPromise = new Promise((resolve, reject) => {
  mongoose
    .connect(process.env.DB_URI)
    .then((data) => {
      resolve(data);
      console.log("connected to mongodb " + " " + data.connection.host);
    })
    .catch((err) => {
      reject();
      console.log(err);
    });
});

export { myPromise };
