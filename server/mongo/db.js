import mongoose from "mongoose";

export default function connectMongoFunction() {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("conneted!!");
    })
    .catch((err) => console.log("failed", err));
}
