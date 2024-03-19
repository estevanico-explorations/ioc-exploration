import { argv } from 'node:process'
import { GetContainer } from 'injectx'
import { userRepository, getUserReposistory } from './injectables'
import { db } from './dependencies'

/**
 * Setup the containers here.
 */
export const init = () => {
  // GetContainer('default').Bind(db, { name: 'db' }).Bind(GetUserRepository)
  GetContainer()
    .Bind(db, { name: 'db' })
    .Bind(userRepository)
}

export default () => {
  init() // Setup the container

  console.log(getUserReposistory('tarek'))
  console.log(getUserReposistory('ANDRIC', 'something'))
}
