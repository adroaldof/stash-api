import { tableNames } from '../table-names.mjs'

export const seed = async (knex) => {
  // Deletes ALL existing entries
  await knex(tableNames.payment).del()

  // Inserts seed entries
  await knex(tableNames.payment).insert([
    {
      uuid: '98f08a8f-a5ec-42a3-a9ca-fdf0d5b00e96',
      loanUuid: 'b664aeb7-d87c-44ae-b785-4ea6b6650877',
      amount: 8000,
      transactionDate: '2023-08-20T15:31:29.223Z',
    },
    {
      uuid: 'ab62bd1b-e8f8-469d-b130-42e69e4858f1',
      loanUuid: 'c9fa685c-65d8-48c2-8faf-03b4d0106710',
      amount: 15000,
      transactionDate: '2021-06-15T03:00:00.000Z',
    },
    {
      uuid: '1c1d019c-f790-4f5c-8f62-ef3ef7c8b365',
      loanUuid: 'c9fa685c-65d8-48c2-8faf-03b4d0106710',
      amount: 8000,
      transactionDate: '2021-07-15T03:00:00.000Z',
    },
    {
      uuid: '443d8b39-2158-47c2-b176-5fa7b31c83ed',
      loanUuid: 'bc9b786e-3e02-4a14-94f3-fe6b6e9f3b41',
      amount: 15000,
      transactionDate: '2021-05-15T03:00:00.000Z',
    },
    {
      uuid: '32bd0c87-e489-4c2f-bbb9-c60fab4c6b71',
      loanUuid: 'bc9b786e-3e02-4a14-94f3-fe6b6e9f3b41',
      amount: 15000,
      transactionDate: '2021-06-15T03:00:00.000Z',
    },
    {
      uuid: '6bf19394-0dd1-4245-9737-c3bad93224e9',
      loanUuid: 'bc9b786e-3e02-4a14-94f3-fe6b6e9f3b41',
      amount: 5000,
      transactionDate: '2021-07-15T03:00:00.000Z',
    },
  ])
}
