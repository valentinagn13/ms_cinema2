//PARA HACER EL ANALISIS DE LOS DATOS
import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class MovieValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string([
      rules.alphaNum({
        allow: ["space", "underscore", "dash"], //es decir que soporta espacios guion bajo
      }),
      rules.minLength(2),
      rules.maxLength(40),
    ]), //que rechaze la peticion en lugar de ingresar información basura a la base de datos
    duration: schema.number([rules.range(1, 1000)]), //validar que si sea un numero la duracion
    date: schema.date({
      format: "yyyy-MM-dd",
    }),
  });

  public messages: CustomMessages = {};
}
