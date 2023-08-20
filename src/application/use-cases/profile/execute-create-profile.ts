import { SaveProfileRepository } from '@/application/ports/profile-repository'
import { registerProfile } from '@/entities/profile/register-profile'

type Input = {
  email: string
  balance: number
}

type Repositories = {
  saveProfileRepository: SaveProfileRepository
}

type CreateProfile = {
  input: Input
  repositories: Repositories
}

export const executeCreateProfile = async ({ input, repositories }: CreateProfile): Promise<void> => {
  const { saveProfileRepository } = repositories
  const profile = registerProfile(input)
  await saveProfileRepository(profile)
}
