import { InjectIn } from 'injectx'
import { UserRepository } from './types'

/**
 * Dependency Consumer
 * 
 * @see https://github.com/tareksalem/injectX?tab=readme-ov-file#create-a-dependency-consumer
 * @param param0 
 * @returns 
 */
export const userRepository = ({ db }: UserRepository) => (username: string, optional?: string) => {
  return db.users.find(user => user.username === username)
}

export const getUserReposistory = InjectIn(userRepository, {
  callbackName: 'user',
})
