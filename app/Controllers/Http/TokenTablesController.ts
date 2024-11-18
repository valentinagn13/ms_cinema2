import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import TokenTable from "App/Models/TokenTable";
import axios from "axios";
import Env from "@ioc:Adonis/Core/Env";

export default class TokenTablesController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      let theTokenTable: TokenTable = await TokenTable.findOrFail(params.id);
      const user_id = await this.getUserIdFromToken(theTokenTable.user_token);
      const Info_user = {
        user_id,
        user_token: theTokenTable.user_token,
      };
      return Info_user;
    } else {
      const data = request.all();
      if ("page" in data && "per_page" in data) {
        const page = request.input("page", 1);
        const perPage = request.input("per_page", 20);
        return await TokenTable.query().paginate(page, perPage); //cuando hace la consulta se hace en ese rango de pagina
      } else {
        return await TokenTable.query(); //es para que espere a la base de datos
      }
    }
  }
  public async create({ request }: HttpContextContract) {
    const body = request.body();
    const theTokenTable: TokenTable = await TokenTable.create(body);
    return theTokenTable;
  }
  public async delete({ params, response }: HttpContextContract) {
    //
    const theTokenTable: TokenTable = await TokenTable.findOrFail(params.id); //buscarlo
    response.status(204);
    return await theTokenTable.delete(); //el teatro que se encontro, eliminelo
  }

  private async getUserIdFromToken(token: string): Promise<string | null> {
    try {
      // Realiza una solicitud a ms-security para descifrar el token
      const response = await axios.post(
        `${Env.get("MS_SECURITY")}/security/decode-token`, // Endpoint para descifrar el token
        { token }, // Enviar el token en el cuerpo de la solicitud
        {
          headers: {
            Authorization: `Bearer ${token}`, // Incluir el token en los encabezados si es necesario
          },
        }
      );
      // Devuelve el ID del usuario obtenido del token descifrado

      return response.data;
    } catch (error) {
      console.error(
        "Error al obtener el ID del usuario desde ms-security:",
        error
      );
      return null; // Devuelve null en caso de error
    }
  }
}
