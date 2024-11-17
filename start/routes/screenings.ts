import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/screenings", "ScreeningsController.find");
  Route.get("/screenings/:id", "ScreeningsController.find"); //pedir teatro con id. lisar solo uno
  Route.post("/screenings", "ScreeningsController.create"); //crearlos
  Route.put("/screenings/:id", "ScreeningsController.update"); //actualizar recibe id
  Route.delete("/screenings/:id", "ScreeningsController.delete"); //borrar, recibe id
});
