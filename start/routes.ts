import Route from "@ioc:Adonis/Core/Route";

Route.get("/", async () => {
  return { hello: "world" };
});

//REGISTRO DE LAS RUTAS
import "./routes/theaters"; //Registro de rutas de teatro
import "./routes/projectors"; //Registro de rutas de proyector
import "./routes/seats"; //Registro de rutas de sillas
import "./routes/movies";
import "./routes/screenings";
import "./routes/adminis";
import "./routes/TokenTable"
