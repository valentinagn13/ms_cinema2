import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'screenings'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.dateTime("date")
      table.integer("movie_id").unsigned().references("movies.id").onDelete("CASCADE") //FORMA DE crear una clave foranea, identificador, referencia a la clase pelicula y eliminacion en cascada
      table
        .integer("theater_id")
        .unsigned()
        .references("theaters.id")
        .onDelete("CASCADE"); 

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
