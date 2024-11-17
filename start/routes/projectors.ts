import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/projectors", "ProjectorsController.find");
  Route.get("/projectors/:id", "ProjectorsController.find"); //pedir teatro con id. lisar solo uno
  Route.post("/projectors", "ProjectorsController.create"); //crearlos
  Route.put("/projectors/:id", "ProjectorsController.update"); //actualizar recibe id
  Route.delete("/projectors/:id", "ProjectorsController.delete"); //borrar, recibe id
});
