import knex from 'knex'
import knexfile from './knexfile.mjs'

export const connection = knex(knexfile)
