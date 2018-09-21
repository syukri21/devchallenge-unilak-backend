import express from "express";
import mongoose from "mongoose";
import graphqlHTTP from "express-graphql";
import schema from "./schema/schema";
// import schema from "./graphql";
import cors from "cors";

const app = express();

app.use(cors());

mongoose.connect(
  "mongodb://localhost:27017/devchallange-unilak",
  {
    useCreateIndex: true,
    useNewUrlParser: true
  }
);

mongoose.connection
  .once("open", () => console.log("Koneksi Berhasil di Lakukan"))
  .on("error", () => console.log("Koneksi gagal dilakukan"));

app.get("/", (req, res) => {
  res.send("hellow wordld, this is graphql api.");
});

// Grpahql API endpoint

app.use(
  "/graphql",
  graphqlHTTP(() => ({
    schema,
    graphql: true,
    pretty: true
  }))
);

app.listen(5000, () => {});
