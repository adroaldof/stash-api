import { faker } from '@faker-js/faker'
import { Payment } from './payment'

export const mockPayment = (overrides: Partial<Payment> = {}): Payment => ({
  uuid: faker.string.uuid(),
  loanUuid: faker.string.uuid(),
  amount: faker.number.float(),
  transactionDate: faker.date.recent(),
  ...overrides,
})
