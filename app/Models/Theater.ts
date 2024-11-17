import { DateTime } from "luxon";
import { BaseModel, column, HasMany, hasMany, HasOne, hasOne } from "@ioc:Adonis/Lucid/Orm";
import Projector from "./Projector";
import Seat from "./Seat";
import Screening from "./Screening";



export default class Theater extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public location: string;
  @column()
  public capacity: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @hasOne(() => Projector, {
    //theater_id es el nombre de la clave foranea en la tabla projectors
    foreignKey: "theater_id",
  })
  public projector: HasOne<typeof Projector>;

  @hasMany(() => Seat, {
    foreignKey: "theater_id",
  })
  public seats: HasMany<typeof Seat>;

  @hasMany(() => Screening, {  //tengo muchas funciones
    //theater_id es el nombre de la clave foranea en la tabla projectors
    foreignKey: "theater_id", //cual es la clave foranea que permite esa relacion
  })
  public screenings: HasMany<typeof Screening>;
}