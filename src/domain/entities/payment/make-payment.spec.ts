import { beforeEach, it, expect } from 'vitest'
import { mockLoan } from '../loan/loan.mocks'
import { faker } from '@faker-js/faker'
import { Loan } from '../loan/loan'
import { makePayment } from './make-payment'

let loan: Loan
let userUuid: string
let amount: number

beforeEach(() => {
  loan = mockLoan()
  userUuid = loan.borrowerUuid
  amount = faker.number.float({ min: 0, max: loan.principal, precision: 0.01 })
})

it('returns a payment object', () => {
  const input = { loan, userUuid, amount }
  const output = makePayment(input)
  expect(output).toEqual(
    expect.objectContaining({
      loanUuid: expect.any(String),
      amount: expect.any(Number),
    }),
  )
})

it('returns a payment object with transaction date', () => {
  const input = { loan, amount, transactionDate: faker.date.recent() }
  const output = makePayment(input)
  expect(output).toEqual(
    expect.objectContaining({
      loanUuid: expect.any(String),
      amount: expect.any(Number),
      transactionDate: expect.any(Date),
    }),
  )
})

it('throws `Loan uuid and amount are required` when borrower try to make payment greater that the loan principal', () => {
  const input = { loan: null as unknown as Loan, amount: null as unknown as number }
  expect(() => makePayment(input)).toThrow('Loan uuid and amount are required')
})

it('throws `Payment above loan agreement` when borrower try to make payment greater that the loan principal', () => {
  const input = { loan, amount: loan.principal + 1 }
  expect(() => makePayment(input)).toThrow('Payment above loan agreement')
})

it('throws `Schedule payment is not allowed` when borrower try to make payment with a future date', () => {
  const input = { loan, amount, transactionDate: faker.date.future() }
  expect(() => makePayment(input)).toThrow('Schedule payment is not allowed')
})
