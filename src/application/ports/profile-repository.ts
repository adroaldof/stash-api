import { Profile } from '@/entities/profile/profile'

export type GetProfileRepository = (uuid: string) => Promise<Profile>

export type CreateProfileRepository = (profile: Profile) => Promise<void>
