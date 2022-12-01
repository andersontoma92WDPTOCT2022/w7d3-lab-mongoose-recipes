import express from 'express';
import UserModel from '../models/user.model.js';
//
const userRoute = express.Router();

//CREATE - MONGODB
//
// /user (criação da rota basica no index.js)
// /user/create (rota)
// 2.1 Crie a rota POST /create
//
userRoute.post('/create', async (req, res) => {
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
//
// user//read/:userId
// 2.2 Crie a rota GET /read/:userId
//
userRoute.get('/read/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id, '-id------- dentro do read/ID----------');
    // const user = await UserModel.find({_id: id})
    const user = await UserModel.findById(id).populate('recipes');
    // usuário existe?
    if (!user) {
      return res.status(400).json({ msg: ' Usuário não encontrado!' });
    }

    return res.status(200).json(user);
    //
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.errors);
  }
});
//
//  exportar p/ index.js!!
//
export default userRoute;
