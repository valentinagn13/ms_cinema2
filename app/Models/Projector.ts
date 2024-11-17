import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Theater from './Theater';

export default class Projector extends BaseModel {

  //TENGO LOS MISMOS ATRIBUTOS DE MIGRATIONS EN MODELS
  @column({ isPrimary: true })
  public id: number;

  @column()
  public brand: string;

  @column()
  public high: number;

  @column()
  public width: number;

  @column()
  public theater_id: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @belongsTo(() => Theater, {
    //theater_id es el nombre de la clave foranea en la tabla projectors
    foreignKey:'theater_id',
  })
  public theater: BelongsTo<typeof Theater>;
}
