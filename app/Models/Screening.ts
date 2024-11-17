import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Movie from './Movie';
import Theater from './Theater';

export default class Screening extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public date: DateTime;
  @column()
  public movie_id: number;
  @column()
  public theater_id: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @belongsTo(() => Movie, {
    foreignKey: "movie_id",
  })
  public movie: BelongsTo<typeof Movie>;

  @belongsTo(() => Theater, {
    //theater_id es el nombre de la clave foranea en la tabla projectors
    foreignKey: "theater_id",
  })
  public theater: BelongsTo<typeof Theater>;
}
