import express from 'express';
import UserModel from '../models/user.model.js';
//
const userRoute = express.Router();

//CREATE - MONGODB

// /user/create
// 2.1 Crie a rota POST /create
//
userRoute.post('/create-user', async (req, res) => {
  try {
    const form = req.body;

    //quer criar um documento dentro da sua collection -> .create()
    const newUser = await UserModel.create(form);

    return res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.errors);
  }
});
export default userRoute;
