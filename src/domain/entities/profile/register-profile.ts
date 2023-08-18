import crypto from 'crypto'
import { Profile } from './profile'

type RegisterProfile = {
  uuid?: string
  email: string
  balance?: number
}

export const registerProfile = ({ uuid = crypto.randomUUID(), email, balance = 0 }: RegisterProfile): Profile => {
  return {
    uuid,
    email,
    balance,
  }
}
