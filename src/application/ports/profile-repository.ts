import { Profile } from '@/entities/profile/profile'

export type SaveProfileRepository = (profile: Profile) => Promise<void>
