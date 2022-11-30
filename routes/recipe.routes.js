import express from 'express';
import RecipeModel from '../models/Recipe.model.js';
//
const recipeRoute = express.Router();
//
//rotas
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
//
//
export default recipeRoute;
