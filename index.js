import mongoose from "mongoose";
import dotenv from "dotenv";
import express, { response } from "express";
import cors from "cors";
dotenv.config();

const port = process.env.PORT || 4000;

const app = express();
app.use(cors());

const userSchema = new mongoose.Schema({
  nameGamer: String,
  highScore: Number,
});

const User = mongoose.model("User", userSchema, "players");

// Hauptseite
app.use(express.json());
app.get("/", async (req, res) => {
  try {
    const player = await User.find();
    res.json(player);
  } catch (error) {
    console.log(error);
  }
  /*   return res.json({ msg: "server is running" }); */
});
/* app.get("/", async (req, res) => {
  return res.json({ msg: "server is running" });
});  */

// user update

// edit user neuer user eintragen
/* app.post("/users/new", async (req, res) => {

  try {
    const newUser = new User(req.body);
    const tempUser = await newUser.save();
    return res.json(tempUser);
  } catch {
    res.status(500).send({ massage: "Eintrag funktioniert nicht!" });
  }
}); */

mongoose.connect(process.env.MONGO_CONNECTION).then(() => {
  app.listen(port, () => {
    console.log(`users API listening on ${port}`);
  });
});
