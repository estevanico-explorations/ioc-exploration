import { injectable, token } from '@injectable-ts/core'
import { Logger, AuthService, MovieService, AndricService } from './types'
import { apiUrl, db, andricName, someFunc } from './configs'

export const logger = injectable('LOGGER', db, (): Logger => console)

export const authService = injectable(apiUrl, (apiUrl: string): AuthService => ({
  authorize: (login: string, password: string): string => `auth token`
}))

export const movieService = injectable(apiUrl, (apiUrl: string): MovieService => ({
  fetchMovies: (authToken: string): string[] => ['movie()', authToken],
}))

// export const andricService = injectable(andricName, someFunc, (injected: any, func: any): AndricService => ({
//   mahName: (): string => {
    
//     // console.log()
//     // func('asd')
//     // console.log()

//     console.log('-------\n', injected, '\n-------')
//     return 'andric()'
//   },
// }))

export const andricService = injectable(token('DB')<string>(), (db: any): any => db)

// Don't forget to add the log params here :)
export const loggerOverride: Logger = ({
  log: (args) => {
    console.log('[OVERRIDDEN LOGGER]', args)
  }
})

// DEEP DEPS -------------------------------------------------
export const multipleTokens = injectable(
  token('DB')<string>(),
  token('API_URL')<string>(),
  (db: string, api: string): any => ({
    db,
    fetchMovies: (authToken: string): string[] => [
      'multipleTokens()', db, api, authToken],
  }))
