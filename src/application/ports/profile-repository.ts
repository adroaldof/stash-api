import { Profile } from '@/entities/profile/profile'

export type GetProfileRepository = (uuid: string) => Promise<Profile>
export type SaveProfileRepository = (profile: Profile) => Promise<void>
