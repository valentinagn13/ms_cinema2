import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/theaters", "TheatersController.find");
  Route.get("/theaters/:id", "TheatersController.find"); //pedir teatro con id. lisar solo uno
  Route.post("/theaters", "TheatersController.create"); //crearlos
  Route.put("/theaters/:id", "TheatersController.update"); //actualizar recibe id
  Route.delete("/theaters/:id", "TheatersController.delete"); //borrar, recibe id
}).middleware(["security"]);
