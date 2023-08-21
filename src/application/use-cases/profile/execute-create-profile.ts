import { SaveProfileRepository } from '@/application/ports/profile-repository'
import { registerProfile } from '@/entities/profile/register-profile'

export type CreateProfileInput = {
  uuid?: string
  email: string
  balance?: number
}

export type CreateProfileRepositories = {
  saveProfileRepository: SaveProfileRepository
}

type CreateProfile = {
  input: CreateProfileInput
  repositories: CreateProfileRepositories
}

export const executeCreateProfile = async ({ input, repositories }: CreateProfile): Promise<void> => {
  const { saveProfileRepository } = repositories
  const profile = registerProfile(input)
  await saveProfileRepository(profile)
}
