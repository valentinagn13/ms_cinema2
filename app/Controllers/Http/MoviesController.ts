import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Movie from "App/Models/Movie";
import Ws from "App/Services/Ws";
import MovieValidator from "App/Validators/MovieValidator";

export default class MoviesController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      let theMovie: Movie = await Movie.findOrFail(params.id);
      await theMovie.load("screenings");
      return theMovie;
    } else {
      const data = request.all();
      if ("page" in data && "per_page" in data) {
        const page = request.input("page", 1);
        const perPage = request.input("per_page", 20);
        return await Movie.query().paginate(page, perPage); //cuando hace la consulta se hace en ese rango de pagina
      } else {
        return await Movie.query(); //es para que espere a la base de datos
      }
    }
  } //SE USÓ VLAIDATOR MOVIE
  public async create({ request }: HttpContextContract) {
    await request.validate(MovieValidator); //*cuando se llame este endpoint antes de mandar valida los datos de acuerdo a los parametros del validador
    const body = request.body();
    const theMovie: Movie = await Movie.create(body);
    return theMovie;
  }

  public async update({ params, request }: HttpContextContract) {
    const theMovie: Movie = await Movie.findOrFail(params.id); //busque el teatro con el identificador
    const body = request.body(); //leer lo que viene en la carta
    theMovie.name = body.name; //de lo que está en la base de datos, actualice con lo que viene dentro del body
    theMovie.duration = body.duration;
    theMovie.date = body.date;

    return await theMovie.save(); //se confirma a la base de datos el cambio
  }

  public async delete({ params, response }: HttpContextContract) {
    //
    const theMovie: Movie = await Movie.findOrFail(params.id); //buscarlo
    response.status(204);
    return await theMovie.delete(); //el teatro que se encontro, eliminelo
  }
  public async notificar({ response }: HttpContextContract) {
    Ws.io.emit("notification", { message: "New notification" });

    response.status(200);

    return {
      message: "ok",
    };
  }
}
