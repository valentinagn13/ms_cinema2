import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Projector from "App/Models/Projector";

export default class ProjectorsController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      let theProjector: Projector = await Projector.findOrFail(params.id);
      await theProjector.load("theater")
      return theProjector;
    } else {
      const data = request.all();
      if ("page" in data && "per_page" in data) {
        const page = request.input('page', 1);
        const perPage = request.input("per_page", 20);
        return await Projector.query().paginate(page, perPage); //cuando hace la consulta se hace en ese rango de pagina
      } else {
        return await Projector.query(); //es para que espere a la base de datos
      }
    }
  }
  public async create({ request }: HttpContextContract) {
    const body = request.body();
    const theProjector: Projector = await Projector.create(body);
    await theProjector.load("theater")
    return theProjector;
  }

  public async update({ params, request }: HttpContextContract) {
    const theProjector: Projector = await Projector.findOrFail(params.id); //busque el teatro con el identificador
    const body = request.body(); //leer lo que viene en la carta
    theProjector.brand = body.brand; //de lo que está en la base de datos, actualice con lo que viene dentro del body
    theProjector.high = body.high;
    theProjector.width = body.width;
    theProjector.theater_id = body.theater_id;

    return await theProjector.save(); //se confirma a la base de datos el cambio
  }

  public async delete({ params, response }: HttpContextContract) {
    //
    const theProjector: Projector = await Projector.findOrFail(params.id); //buscarlo
    response.status(204);
    return await theProjector.delete(); //el teatro que se encontro, eliminelo
  }
}
