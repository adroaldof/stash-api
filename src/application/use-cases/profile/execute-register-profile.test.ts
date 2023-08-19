import { faker } from '@faker-js/faker'
import { beforeEach, expect, it, vi } from 'vitest'
import { executeRegisterProfile } from './execute-register-profile'

let uuid: string
let email: string
let balance: number

beforeEach(() => {
  uuid = faker.string.uuid()
  email = faker.internet.email()
  balance = faker.number.float({ min: 0, max: 100_000, precision: 0.01 })
})

it('registers a profile', async () => {
  const input = { uuid, email, balance }
  const repositories = { saveProfileRepository: vi.fn() }
  await executeRegisterProfile({ input, repositories })
  expect(repositories.saveProfileRepository).toHaveBeenCalledWith({
    uuid,
    email,
    balance,
  })
})
