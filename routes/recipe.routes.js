import express from 'express';
import RecipeModel from '../models/Recipe.model.js';
//
const recipeRoute = express.Router();
//
//rotas
//
//Iteration 2 - Create a recipe
//
recipeRoute.post('/create-recipe', async (req, res) => {
  try {
    const form = req.body;

    //quer criar um documento dentro da sua collection -> .create()
    const newRecipe = await RecipeModel.create(form);

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
//
export default recipeRoute;
