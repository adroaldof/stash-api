import { GetProfileRepository, CreateProfileRepository } from '@/application/ports/profile-repository'
import { Profile } from '@/entities/profile/profile'
import { Status } from '@/domain/common-types'
import { tableNames } from '@/database/table-names.mjs'
import { connection } from '@/database/connection'

export const createProfileRepository: CreateProfileRepository = async (profile) => {
  await connection(tableNames.profile).insert(profile)
}

export const getProfileRepository: GetProfileRepository = async (uuid) => {
  const databaseOutput = await connection(tableNames.profile).where({ uuid }).first()
  return fromDatabaseOutputToProfile(databaseOutput)
}

type ProfileDatabaseOutput = {
  id: number
  uuid: string
  email: string
  balance: number
  status: Status
  createdAt: Date
  updatedAt: Date
}

const fromDatabaseOutputToProfile = (databaseOutput: ProfileDatabaseOutput): Profile => ({
  uuid: databaseOutput.uuid,
  email: databaseOutput.email,
  balance: databaseOutput.balance,
})
