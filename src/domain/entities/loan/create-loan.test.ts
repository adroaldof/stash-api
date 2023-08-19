import { it, expect, beforeEach } from 'vitest'
import { createLoan } from './create-loan'
import { faker } from '@faker-js/faker'
import { mockProfile } from '../profile/profile.mocks'
import { Profile } from '../profile/profile'

let lender: Profile
let borrower: Profile
let principal: number

beforeEach(() => {
  lender = mockProfile()
  borrower = mockProfile()
  principal = faker.number.float({ min: 500, max: 100_000, precision: 0.01 })
})

it('creates a loan with lender, borrower and amount borrowed', async () => {
  const createdLoan = createLoan({ lender, borrower, principal })
  expect(createdLoan).toEqual(
    expect.objectContaining({
      lenderUuid: expect.any(String),
      borrowerUuid: expect.any(String),
      principal: expect.any(Number),
      transactionDate: expect.any(Date),
    }),
  )
})

it('accepts passing transaction date when creating a loan', async () => {
  const transactionDate = faker.date.past()
  const createdLoan = createLoan({ lender, borrower, principal, transactionDate })
  expect(createdLoan.transactionDate).toEqual(transactionDate)
})

it('throws `Cannot lend money from yourself` error when the amount is lower than zero', async () => {
  expect(() => createLoan({ lender, borrower: lender, principal })).toThrowError('Cannot lend money from yourself')
})

it('throws `Both parties must be present` error when the amount is lower than zero', async () => {
  const lender = null as unknown as Profile
  expect(() => createLoan({ lender, borrower, principal })).toThrowError('Both parties must be present')
})

it('throws `Amount must be greater than zero` error when the amount is lower than zero', async () => {
  const principal = faker.number.float() * -1
  expect(() => createLoan({ lender, borrower, principal })).toThrowError('Amount must be greater than zero')
})
