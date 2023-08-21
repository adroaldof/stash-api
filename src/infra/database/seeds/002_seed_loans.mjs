import { tableNames } from '../table-names.mjs'

export const seed = async (knex) => {
  // Deletes ALL existing entries
  await knex(tableNames.loan).del()

  // Inserts seed entries
  await knex(tableNames.loan).insert([
    {
      uuid: 'b664aeb7-d87c-44ae-b785-4ea6b6650877',
      lenderUuid: 'a3aada12-3de0-480b-9d2b-7bd5cbfc46cb',
      borrowerUuid: 'e27339c5-5d80-46e7-a609-525d9626d2a3',
      principal: 120000,
      transactionDate: '2022-06-12T03:00:00.000Z',
    },
    {
      uuid: 'c9fa685c-65d8-48c2-8faf-03b4d0106710',
      lenderUuid: 'a3aada12-3de0-480b-9d2b-7bd5cbfc46cb',
      borrowerUuid: '2dab15d2-bee2-4ed2-a142-466e69eb91f2',
      principal: 80000,
      transactionDate: '2021-04-29T03:00:00.000Z',
    },
    {
      uuid: 'bc9b786e-3e02-4a14-94f3-fe6b6e9f3b41',
      lenderUuid: 'e27339c5-5d80-46e7-a609-525d9626d2a3',
      borrowerUuid: '2dab15d2-bee2-4ed2-a142-466e69eb91f2',
      principal: 50000,
      transactionDate: '2021-05-01T03:00:00.000Z',
    },
    {
      uuid: 'ae96eec8-f884-4208-aed7-162cc12f4123',
      lenderUuid: 'a3aada12-3de0-480b-9d2b-7bd5cbfc46cb',
      borrowerUuid: '852cb46b-ccb7-42c8-864d-1c7282263f4f',
      principal: 30000,
      transactionDate: '2021-05-01T03:00:00.000Z',
    },
  ])
}
