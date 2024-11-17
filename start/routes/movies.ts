import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/movies", "MoviesController.find");
  Route.get("/movies/:id", "MoviesController.find"); //pedir teatro con id. lisar solo uno
  Route.post("/movies", "MoviesController.create"); //crearlos
  Route.put("/movies/:id", "MoviesController.update"); //actualizar recibe id
  Route.delete("/movies/:id", "MoviesController.delete"); //borrar, recibe id
}).middleware(["security"]);  //COLOCAR EL POLICIA, ACTIVARLO PARA MOVIES 
