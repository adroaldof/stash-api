import { CreateProfileRepository } from '@/application/ports/profile-repository'
import { registerProfile } from '@/entities/profile/register-profile'

export type CreateProfileInput = {
  uuid?: string
  email: string
  balance?: number
}

export type CreateProfileRepositories = {
  createProfileRepository: CreateProfileRepository
}

type CreateProfile = {
  input: CreateProfileInput
  repositories: CreateProfileRepositories
}

export const executeCreateProfile = async ({ input, repositories }: CreateProfile): Promise<void> => {
  const { createProfileRepository } = repositories
  const profile = registerProfile(input)
  await createProfileRepository(profile)
}
