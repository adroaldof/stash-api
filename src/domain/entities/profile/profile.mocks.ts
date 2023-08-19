import { faker } from '@faker-js/faker'
import { Profile } from './profile'

export const mockProfile = (overrides: Partial<Profile> = {}): Profile => ({
  uuid: faker.string.uuid(),
  email: faker.internet.email(),
  balance: faker.number.float({ min: 500, max: 100_000, precision: 0.01 }),
  ...overrides,
})
