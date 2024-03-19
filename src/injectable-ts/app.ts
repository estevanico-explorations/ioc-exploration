import { injectable } from '@injectable-ts/core'
import { authService, logger, movieService } from './injectables'
import { EntryPoint } from './types'
// import { logger } from './services'

// export const injectableJS = async () => {
export const injectableJS = async () => {
  console.clear()
  // console.log('@injectable-ts/core')

  // const service = await authService({ API_URL: 'https://my-api.com' })
  //   .authorize('LOGIN', 'PASSWORD')
    
  // console.log('service', service)
  // const entry = () => (
  //   (authService: any, movieService: any): EntryPoint =>
  //     async (login, password): Promise<void> => {
  //       const token = await authService.authorize(login, password)
  //       const movies = await movieService.fetchMovies(token)
  //       // logger.log(movies)
  //       console.log(logger)
  //     }
  // )

  const entryPoint = injectable(
    authService,
    movieService,
    logger,
    (authService, movieService): EntryPoint =>
      async (login, password): Promise<void> => {
        const token = await authService.authorize(login, password)
        const movies = await movieService.fetchMovies(token)
        // loggerService.log(movies)
        console.log('logger', logger)
        console.log(movies)

        // console.log(logger.toString())
      }
  )

  const run = entryPoint({ API_URL: 'https://my-api.com' })
  await run('John Doe', 'qweqwe')
}
