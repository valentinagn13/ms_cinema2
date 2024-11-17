import { DateTime } from "luxon";
import { BaseModel, column, HasMany, hasMany } from "@ioc:Adonis/Lucid/Orm";
import Screening from "./Screening";

export default class Movie extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;
  @column()
  public duration: number;
  @column()
  public date: Date;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @hasMany(() => Screening, {
    //tengo muchas funciones
    //theater_id es el nombre de la clave foranea en la tabla projectors
    foreignKey: "movie_id", //cual es la clave foranea que permite esa relacion
  })
  public screenings: HasMany<typeof Screening>;
}
