import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Seat from "App/Models/Seat";

export default class SeatsController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      let theSeat: Seat = await Seat.findOrFail(params.id);
      await theSeat.load("theater");
      return theSeat;
    } else {
      const data = request.all();
      if ("page" in data && "per_page" in data) {
        const page = request.input("page", 1);
        const perPage = request.input("per_page", 20);
        return await Seat.query().paginate(page, perPage); //cuando hace la consulta se hace en ese rango de pagina
      } else {
        return await Seat.query(); //es para que espere a la base de datos
      }
    }
  }
  public async create({ request }: HttpContextContract) {
    const body = request.body();
    const theSeat: Seat = await Seat.create(body);
    return theSeat;
  }

  public async update({ params, request }: HttpContextContract) {
    const theSeat: Seat = await Seat.findOrFail(params.id); //busque el teatro con el identificador
    const body = request.body(); //leer lo que viene en la carta
    theSeat.location = body.location; //de lo que está en la base de datos, actualice con lo que viene dentro del body
    theSeat.reclining = body.reclining;
    theSeat.theater_id = body.theater_id;
    return await theSeat.save(); //se confirma a la base de datos el cambio
  }

  public async delete({ params, response }: HttpContextContract) {
    //
    const theSeat: Seat = await Seat.findOrFail(params.id); //buscarlo
    response.status(204);
    return await theSeat.delete(); //el teatro que se encontro, eliminelo
  }
}
