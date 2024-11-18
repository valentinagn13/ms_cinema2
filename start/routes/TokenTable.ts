import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/tokenTables", "TokenTablesController.find");
  Route.get("/tokenTables/:id", "TokenTablesController.find"); //pedir teatro con id. lisar solo uno
  Route.post("/tokenTables", "TokenTablesController.create"); //crearlos
  Route.delete("/tokenTables/:id", "TokenTablesController.delete"); //borrar, recibe id
});
