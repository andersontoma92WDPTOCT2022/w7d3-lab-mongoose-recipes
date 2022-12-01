import express from 'express';
import UserModel from '../models/user.model.js';
import RecipeModel from '../models/Recipe.model.js';
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
// user/read/:userId
// 2.2 Crie a rota GET /read/:userId
//
userRoute.get('/read/:id', async (req, res) => {
  try {
    const { id } = req.params;
    //console.log(id, '-id------- dentro do read/ID----------');
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
// user/update/:userId
// 2.3 Crie a rota PUT /update/:userId
//
userRoute.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true, runValidators: true }
    );

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.errors);
  }
});
//
// user/delete/:userId
// 2.4 Crie a rota DELETE /delete/:userId
//
userRoute.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await UserModel.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(400).json({ msg: 'Usuário não encontrado!' });
    }

    const users = await UserModel.find();

    //deletar TODAS as recipes que o usuário é dono
    await RecipeModel.deleteMany({ creator: id });

    return res.status(204).json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.errors);
  }
});
//
//  exportar p/ index.js!!
//
export default userRoute;
