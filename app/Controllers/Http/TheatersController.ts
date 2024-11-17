import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Theater from "App/Models/Theater";
//import { Query } from 'mysql2/typings/mysql/lib/protocol/sequences/Query';

export default class TheatersController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      let theTheater: Theater = await Theater.findOrFail(params.id);
      await theTheater.load("projector"); //devuelve la info de que projector tiene ese teatro
      await theTheater.load("seats"); //devuelve la info de que sillas tiene el teatro
      await theTheater.load("screenings", (query) => {
        query.preload("movie");
      }); //devuelve la info de que sillas tiene el teatro

      return theTheater;
    } else {
      const data = request.all();
      if ("page" in data && "per_page" in data) {
        const page = request.input("page", 1);
        const perPage = request.input("per_page", 20);
        return await Theater.query().paginate(page, perPage); //cuando hace la consulta se hace en ese rango de pagina
      } else {
        return await Theater.query(); //es para que espere a la base de datos
      }
    }
  }
  public async create({ request }: HttpContextContract) {
    const body = request.body();
    const theTheater: Theater = await Theater.create(body);
    return theTheater;
  }

  public async update({ params, request }: HttpContextContract) {
    const theTheater: Theater = await Theater.findOrFail(params.id); //busque el teatro con el identificador
    const body = request.body(); //leer lo que viene en la carta
    theTheater.location = body.location; //de lo que está en la base de datos, actualice con lo que viene dentro del body
    theTheater.capacity = body.capacity;
    return await theTheater.save(); //se confirma a la base de datos el cambio
  }

  public async delete({ params, response }: HttpContextContract) {
    //
    const theTheater: Theater = await Theater.findOrFail(params.id); //buscarlo
    await theTheater.load("projector"); //*el teatro que se encontro, eliminelo
    if (theTheater["projector"]==null){  //!verificar que el teatro no tenga asignado un projector, si tiene no se puede eliminar
      response.status(204);
      return await theTheater.delete();
    }else {
      return {
        "alert":"no se puede eliminar, reasigne el projector " //se sugiere asignar el projector a otro teatro en lugar de eliminarlo 
      }
    }


  }
}
