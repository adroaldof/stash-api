import { faker } from '@faker-js/faker'
import { Loan } from './loan'

export const mockLoan = (overrides: Partial<Loan> = {}): Loan => ({
  lenderUuid: faker.string.uuid(),
  borrowerUuid: faker.string.uuid(),
  principal: faker.number.float(),
  transactionDate: faker.date.recent(),
  ...overrides,
})
