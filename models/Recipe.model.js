//const mongoose = require('mongoose');
//const Schema = mongoose.Schema;
//
import { Schema, model } from 'mongoose';
//
const recipeSchema = new Schema(
  {
    // TODO: write the schema
    title: {
      type: String,
      required: true,
      unique: true,
    },
    level: {
      type: String,
      enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef'],
    },
    ingredients: [{ type: String }],
    cuisine: {
      type: String,
      required: true,
    },
    dishType: [
      {
        type: String,
        enum: [
          'breakfast',
          'main_course',
          'soup',
          'snack',
          'drink',
          'dessert',
          'other',
        ],
      },
    ],
    image: {
      type: String,
      default: 'https://images.media-allrecipes.com/images/75131.jpg',
    },
    duration: {
      type: Number,
      min: 0,
    },
    creator: { type: Schema.Types.ObjectId, ref: 'User' },
    created: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);
//usar primeira letra maiuscula e singular (nome da collection = recipe no mongo)
const RecipeModel = model('Recipe', recipeSchema);
// note que o ref: no model é o "Recipe" da linha acima
export default RecipeModel;
