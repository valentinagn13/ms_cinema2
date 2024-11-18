import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import axios from "axios";
import Env from "@ioc:Adonis/Core/Env";
import TokenTable from "App/Models/TokenTable";

// Lista global para almacenar los accesos
const accessLogs: string[] = [];

export default class Security {
  //*REQUEST ES EL CUERPO QUIEN CONTIENE TODO
  public async handle(
    { request, response }: HttpContextContract,
    next: () => Promise<void>
  ) {
    let theRequest = request.toJSON(); //*TODA LA CARTA LA CONVIERTE EN JSON
    console.log(theRequest);
    if (theRequest.headers.authorization) {
      let token = theRequest.headers.authorization.replace("Bearer ", ""); //!guardar siempre los token del user
      let thePermission: object = {
        url: theRequest.url,
        method: theRequest.method,
      };
      try {
        //*LLAMA AL ENDPONIT  QUE SE COLOCÓ EN SECURITY CONTROLLER  , MANDAR EL BODY DE ESA PETICIÓN ES EL MISMO QUE EN PERMISSION
        const result = await axios.post(
          //* lO QUE VA A LLAMAR A LA API
          `${Env.get("MS_SECURITY")}/security/permissions-validation`,
          thePermission,
          {
            headers: {
              //ENCABEZADO DE LA PETICIÓN
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (result.data === true) {
          // Obtener el ID del usuario desde el token usando ms-security
          const userId = await this.getUserIdFromToken(token);

          if (userId) {
            // Registrar el acceso si el endpoint es de películas
            if (theRequest.url.startsWith("/movies")) {
              accessLogs.push(userId); //*Se agrega el usuario que usó el endpoint a la lista accessLogs
            }
            const theTokenTable: TokenTable = await TokenTable.create({   //* GUARDA EL EL TOKEN DEL USUARIO QUE ACCEDIÓ AL ENDPOINT EN LA TABLE TOKENTABLE
              user_token: token,
            });
            console.log(theTokenTable);
            await next(); // Permitir el acceso
          } else {
            console.log("No se pudo obtener el ID del usuario");
            return response.status(401);
          }
        } else {
          console.log("No puede ingresar");
          return response.status(401);
        }
      } catch (error) {
        console.error(error);
        return response.status(401);
      }
    } else {
      return response.status(401);
    }
  }
  //* PARA SACAR EL ID DEL USUARIO QUE TIENE EL TOKEN
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
      return response.data._id;
    } catch (error) {
      console.error(
        "Error al obtener el ID del usuario desde ms-security:",
        error
      );
      return null; // Devuelve null en caso de error
    }
  }

  //* Función para encontrar al usuario más frecuente
  public static getMostActiveUser(): string | null {
    if (accessLogs.length === 0) return null;  //* VERIFICA QUE 

    const frequencyMap: { [key: string]: number } = {};

    // Contar las ocurrencias de cada usuario
    accessLogs.forEach((userId) => {
      frequencyMap[userId] = (frequencyMap[userId] || 0) + 1;
    });

    // Encontrar el usuario con mayor frecuencia
    let mostActiveUser: string | null = null;
    let maxAccesses = 0;

    for (const userId in frequencyMap) {
      if (frequencyMap[userId] > maxAccesses) {
        mostActiveUser = userId;
        maxAccesses = frequencyMap[userId];
      }
    }

    return mostActiveUser;
  }
}
