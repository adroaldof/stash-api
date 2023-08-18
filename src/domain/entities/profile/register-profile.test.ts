import { faker } from '@faker-js/faker'
import { beforeEach, expect, it } from 'vitest'
import { registerProfile } from './register-profile'

let uuid: string
let email: string
let balance: number

beforeEach(() => {
  uuid = faker.string.uuid()
  email = faker.internet.email()
  balance = faker.number.float({ min: 0, max: 100_000, precision: 0.01 })
})

it('register a profile with uuid, email and amount', () => {
  const registeredProfile = registerProfile({ uuid, email, balance })
  expect(registeredProfile).toEqual(
    expect.objectContaining({
      uuid: expect.any(String),
      balance: expect.any(Number),
    }),
  )
  expect(registeredProfile.balance).toBe(balance)
})

it('register a profile with email and amount', () => {
  const registeredProfile = registerProfile({ email, balance })
  expect(registeredProfile).toEqual(
    expect.objectContaining({
      uuid: expect.any(String),
      balance: expect.any(Number),
    }),
  )
  expect(registeredProfile.balance).toBe(balance)
})

it('register a profile with only email', () => {
  const registeredProfile = registerProfile({ email })
  expect(registeredProfile).toEqual(
    expect.objectContaining({
      uuid: expect.any(String),
      balance: expect.any(Number),
    }),
  )
  expect(registeredProfile.balance).toBe(0)
})
