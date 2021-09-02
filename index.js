const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
      updateDB();
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });



const updateDB = async ()=> {
  //////////////////////////////////////////
  //Create a new reciped
 /* const createdRecipe = await Recipe.create({
  title: "abc",
  level: "Easy Peasy",
  ingredients: ["whatever"],
  cuisine: "something",
  dishType: "other",
  image: "default",
  duration: 0,
  creator: "abc",
});

console.log(createdRecipe.title) */
try{
await Recipe.insertMany(data);
data.forEach((recipe)=> console.log(recipe.title));

const recipeUpdate = await Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100});
console.log(`${recipeUpdate.title} success`);

await Recipe.deleteOne({title: "Carrot Cake"});
console.log("recipe deleted");

/////////////////////////////////////
} catch(e) {
  console.log("error occured", e); 
} finally {
  mongoose.connection.close();
  console.log("closed go enjoy your date");
}
}
 

