import userModel from "../models/userModel.js";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const createUser = async (req, res, next) => {
  try {
    //code here
    const { firstName, email, password, image } = req.body;

    //Check if user exists
    let existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new userModel({
      firstName,
      email,
      password,
      image,
    });

    //bcrypt password
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);

    //save user
    await newUser.save();

    //Create a JWT
    const payload = {
      newUser: {
        id: newUser._id,
        name: newUser.firstName,
      },
    };

    jwt.sign(payload, "randomString", { expiresIn: "1h" }, (err, token) => {
      if (err) throw err;
      res.status(200).json({ token });
    });
  } catch (error) {
    res.send(error.stack);
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    //Check if user exists
    let user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }
    //Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }
    //Create a JWT
    const payload = {
      user: {
        id: user._id,
        name: user.firstName,
      },
    };

    jwt.sign(payload, "randomString", { expiresIn: "1h" }, (err, token) => {
      if (err) throw err;
      res.status(200).json({ token });
    });
  } catch (error) {
    res.send(error.stack);
  }
};

export const getUsers = async (req, res) => {
  try {
    //code here
    if (req.gogoleId) {
      const users = await userModel.find();
      res.status(200).json({ details: users });
    }
  } catch (error) {
    res.send(error.stack);
  }
};

//delet user
//findByIdAndDelete(id)
export const deleteUser = async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User deleted!" });
  } catch (error) {
    res.send(error.stack);
  }
};
