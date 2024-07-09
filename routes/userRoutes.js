import express from "express";

import {
  createUser,
  getUsers,
  deleteUser,
  loginUser,
} from "../controllers/userController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

//CRUD - Create (POST request), Read (GET request), Update (put, patch, update request/s), Delete (DELETE request)

//Create - Post request
//http://localhost:5000/create-user
router.post("/create-user", createUser);
router.post("/login", loginUser);

//Get users
//http://localhost:5000/get-users
router.get("/get-users", auth, getUsers);

//delete user
router.delete("/:id", auth, deleteUser);

export default router;
