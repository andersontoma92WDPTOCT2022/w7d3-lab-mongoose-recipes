import express from 'express';
import RecipeModel from '../models/Recipe.model.js';
import UserModel from '../models/user.model.js';
//
const recipeRoute = express.Router();
//
//rotas
//
//Iteration 2 - Create a recipe
//
recipeRoute.post('/create-recipe/:idUser', async (req, res) => {
  try {
    const { idUser } = req.params;

    console.log(idUser, req.body, '-- id e body no create');

    //quer criar um documento dentro da sua collection -> .create()
    const newRecipe = await RecipeModel.create({
      ...req.body,
      creator: idUser,
    });
    //
    console.log(newRecipe, ' --- new recipe');
    //
    await UserModel.findByIdAndUpdate(
      idUser,
      {
        $push: {
          recipes: newRecipe._id,
        },
      },
      { new: true, runValidators: true }
    );

    //

    return res.status(201).json(newRecipe);
  } catch (error) {
    console.log(error.errors);
    return res.status(500).json(error.errors);
  }
});
//
//Iteration 3 - Insert multiple recipes
//
recipeRoute.post('/create-many', async (req, res) => {
  try {
    const form = req.body;

    //quer criar um documento dentro da sua collection -> .create()
    const newRecipe = await RecipeModel.create(form);
    //
    form.forEach((receita) => {
      console.log(receita.title, '<-- create many, titulo');
    });
    //
    return res.status(201).json(newRecipe);
  } catch (error) {
    console.log(error.errors);
    return res.status(500).json(error.errors);
  }
});
//
//   Iteration 4 - Update recipe
//
// enviar na forma:
// {"title": "Asian Glazed Chicken Thighs","duration": 10}
//
recipeRoute.put('/editDuration', async (req, res) => {
  try {
    const { title, duration } = req.body;
    console.log(title, duration, '----title/duration');
    const updatedRecipe = await RecipeModel.findOneAndUpdate(
      { title: title },
      { duration: duration },

      { new: true, runValidators: true }
    );
    console.log(updatedRecipe, '--- updated');
    return res.status(200).json(updatedRecipe);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.errors);
  }
});
//
//   Iteration 5 - Remove a recipe
//
recipeRoute.delete('/deleteTitle/', async (req, res) => {
  try {
    console.log(req.body);

    const deletedRecipe = await RecipeModel.deleteOne(req.body);

    if (!deletedRecipe) {
      return res.status(400).json({ msg: 'recipe não encontrada!' });
    }

    const recipes = await RecipeModel.find();
    console.log('deletado');

    return res.status(200).json(recipes);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.errors);
  }
});
//
//

export default recipeRoute;
