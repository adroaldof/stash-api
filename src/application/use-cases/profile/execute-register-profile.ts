import { SaveProfileRepository } from '@/application/ports/profile-repository'
import { registerProfile } from '@/entities/profile/register-profile'

type Input = {
  email: string
  balance: number
}

type Repositories = {
  saveProfileRepository: SaveProfileRepository
}

type RegisterProfile = {
  input: Input
  repositories: Repositories
}

export const executeRegisterProfile = async ({ input, repositories }: RegisterProfile): Promise<void> => {
  const { saveProfileRepository } = repositories
  const profile = registerProfile(input)
  await saveProfileRepository(profile)
}
