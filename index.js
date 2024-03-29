import mongoose from "mongoose";
import dotenv from "dotenv";
import express, { response } from "express";
import cors from "cors";
dotenv.config();

const port = process.env.PORT || 4000;

const app = express();
app.use(cors());

const userSchema = new mongoose.Schema({
  name: String,
  highscore: Number,
});

const User = mongoose.model("User", userSchema, "players");

// Hauptseite
app.use(express.json());
app.get("/", async (req, res) => {
  try {
    const player = await User.find().sort({ highscore: -1 });
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
app.post("/", async (req, res) => {
  const newUser = new User({
    name: req.body.name,
    highscore: req.body.highscore,
    /*   test: req.body.test, */
  });
  newUser
    .save()
    .then((name) => res.status(200).json(name))
    .catch((err) => res.status(500).json({ error: "kann nicht " + err }));

  /*   try {
    const newUser = new User(req.body);
    const tempUser = await newUser.save();
    return res.json(tempUser);
  } catch {
    res.status(500).send({ massage: "Eintrag funktioniert nicht!" });
  } */
});

mongoose.connect(process.env.MONGO_CONNECTION).then(() => {
  app.listen(port, () => {
    console.log(`users API listening on ${port}`);
  });
});
