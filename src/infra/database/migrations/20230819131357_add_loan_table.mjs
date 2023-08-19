import { defaultStatuses } from '../migrations-commons.mjs'
import { tableNames } from '../table-names.mjs'

export const up = async (knex) =>
  knex.schema.createTable(tableNames.loan, (table) => {
    table.increments('id', { primaryKey: false })
    table.uuid('uuid', { primaryKey: true }).notNullable().defaultTo(knex.raw('uuid_generate_v4()'))
    table.uuid('lender_uuid').notNullable()
    table.uuid('borrower_uuid').notNullable()
    table.decimal('principal').notNullable().defaultTo(0)
    table.datetime('transaction_date').notNullable()
    table.enum('status', defaultStatuses).defaultTo('active')
    table.timestamps({ useTimestamps: true, defaultToNow: true })
  })

export const down = async (knex) => knex.schema.dropTable(tableNames.loan)
