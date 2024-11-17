import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Screening from "App/Models/Screening";

export default class ScreeningsController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      let theScreening: Screening = await Screening.findOrFail(params.id);
      await theScreening.load("movie"); //devuelve la info de que pelicula tiene ese screening
      await theScreening.load("theater"); //devuelve la info de que teatro tiene el screeninig
      return theScreening;
    } else {
      const data = request.all();
      if ("page" in data && "per_page" in data) {
        const page = request.input("page", 1);
        const perPage = request.input("per_page", 20);
        return await Screening.query().paginate(page, perPage); //cuando hace la consulta se hace en ese rango de pagina
      } else {
        return await Screening.query(); //es para que espere a la base de datos
      }
    }
  }
  public async create({ request }: HttpContextContract) {
    const body = request.body();
    const theScreening: Screening = await Screening.create(body);
    return theScreening;
  }

  public async update({ params, request }: HttpContextContract) {
    const theScreening: Screening = await Screening.findOrFail(params.id); //busque el teatro con el identificador
    const body = request.body(); //leer lo que viene en la carta
    theScreening.date = body.date; //de lo que está en la base de datos, actualice con lo que viene dentro del body
    theScreening.theater_id = body.theater_id;
    theScreening.movie_id = body.movie_id;

    return await theScreening.save(); //se confirma a la base de datos el cambio
  }

  public async delete({ params, response }: HttpContextContract) {
    //
    const theScreening: Screening = await Screening.findOrFail(params.id); //buscarlo
    response.status(204);
    return await theScreening.delete(); //el teatro que se encontro, eliminelo
  }
}
