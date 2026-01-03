const express = require("express");
const database = require("./database");
const User = require("../model/user");
const bcrypt = require("bcrypt");
const { UserValidation } = require("../utils/validation");
const app = express();
app.use(express.json());
app.post("/signup", async (req, res) => {
  try {
    UserValidation(req);
    const { firstName, lastName, email, password, gender } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      gender,
    });
    await user.save();
    res.status(201).send("user signed up !!!");
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const validEmail = await User.findOne({ email });
    if (!validEmail) {
      throw new Error("Invalid credentials");
    }
    const isPassword = await bcrypt.compare(password, validEmail.password);
    if (isPassword) {
      res.send("User login success");
    } else {
      throw new Error("Imvalid credentials");
    }
  } catch (err) {
    throw new Error("Error :" + err.message);
  }
});
app.get("/user", async (req, res) => {
  try {
    const user = await User.find({ email: req.body.email });
    res.send(user);
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});
app.get("/feed", async (req, res) => {
  try {
    const Users = await User.find({});
    res.send(Users);
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});
app.get("/userById", async (req, res) => {
  try {
    const user = await User.findById({ _id: req.body.id });
    res.send(user);
  } catch (err) {
    res.status(400).send("Something went wronggg");
  }
});
app.delete("/deleteUser", async (req, res) => {
  try {
    const UserDelete = await User.deleteOne({ email: req.body.email });
    res.send(UserDelete);
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});
app.patch("/user/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const isAllowed = ["firstName", "lastName", "age", "gender"];

    const isUpdateAllowed = Object.keys(req.body).every((k) =>
      isAllowed.includes(k)
    );

    if (!isUpdateAllowed) {
      throw new Error("Update Not Allowed");
    }
    const user = await User.findByIdAndUpdate({ _id: userId }, req.body);
    res.send("User updated successfully");
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});
database
  .then(() => {
    console.log("Database connected");
    app.listen(3000, () => {
      console.log("Server is running on port 3000!!");
    });
  })
  .catch((err) => {
    console.log("Database connection failed", err);
  });
