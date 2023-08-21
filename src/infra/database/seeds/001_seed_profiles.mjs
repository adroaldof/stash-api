import { tableNames } from '../table-names.mjs'

export const seed = async (knex) => {
  // Deletes ALL existing entries
  await knex(tableNames.profile).del()

  // Inserts seed entries
  await knex(tableNames.profile).insert([
    {
      uuid: 'a3aada12-3de0-480b-9d2b-7bd5cbfc46cb',
      email: 'Vidal49@hotmail.com',
      balance: 20255.43,
    },
    {
      uuid: 'e27339c5-5d80-46e7-a609-525d9626d2a3',
      email: 'Leta_Huel7@yahoo.com',
      balance: 37424.61,
    },
    {
      uuid: '2dab15d2-bee2-4ed2-a142-466e69eb91f2',
      email: 'Karen25@hotmail.com',
      balance: 93301.75,
    },
    {
      uuid: '852cb46b-ccb7-42c8-864d-1c7282263f4f',
      email: 'Tressa_Fritsch87@yahoo.com',
      balance: 90602.01,
    },
  ])
}
