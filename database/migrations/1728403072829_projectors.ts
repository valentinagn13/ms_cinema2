import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'projectors'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string("brand")
      table.integer("high")
      table.integer("width")
      //CLAVE FORANEA  references: como aparece en la otra tabla como clave primaria  .unsigned palabra poruqe es foranea
      table.integer("theater_id").unsigned().references('theaters.id') 

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
