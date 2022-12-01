import express from 'express';
import * as dotenv from 'dotenv';
import connect from './config/db.config.js';
import recipeRoute from './routes/recipe.routes.js';
import userRoute from './routes/user.routes.js';
//
//habilitar o servidor a ter variáveis de ambiente
dotenv.config();

//instanciar a variável que vai ficar responsável pelo nosso servidor -> app
const app = express();

//configurar o servidor para aceitar enviar e receber arquivos em JSON
app.use(express.json());

//conectando com o banco de dados
connect();

app.use('/recipe', recipeRoute);
app.use('/user', userRoute);

// o servidor subindo pro ar.
app.listen(process.env.PORT, () => {
  console.log(
    `--->>  App up and running on port http://localhost:${process.env.PORT}`
  );
});

//*************************
//*************************
// aula antiga
/* 
const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
 */
