import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/seats", "SeatsController.find");
  Route.get("/seats/:id", "SeatsController.find"); //pedir teatro con id. lisar solo uno
  Route.post("/seats", "SeatsController.create"); //crearlos
  Route.put("/seats/:id", "SeatsController.update"); //actualizar recibe id
  Route.delete("/seats/:id", "SeatsController.delete"); //borrar, recibe id
});
