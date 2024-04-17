import { injectable, token, provide } from '@injectable-ts/core'
import { Logger, AuthService, MovieService, EntryPoint } from './types'
import { logger, movieService, authService, loggerOverride, multipleTokens, andricService } from './services'
import { configs } from './configs'

// --- MAIN ----------------------------------------------
export const overriddenDeps = () => {
  const entryPoint = injectable(
    { logger, movieService, authService },
    ({ authService, movieService, logger }): EntryPoint =>
      async (login, password): Promise<void> => {
        const token = authService.authorize(login, password)
        const movies = movieService.fetchMovies(token)

        logger.log(movies)
        logger.log('entryPoint(token):', token)
        logger.log('entryPoint(movie):', movies)
      }
  )

  const run = entryPoint({ ...configs, LOGGER: loggerOverride })

  run('John Doe', 'qweqwe')
}

/**
 * There is some confusion in the documentation and the new example clears
 * it up a bunch. Using the object is much simpler and doesn't require the
 * order to be correct.
 * 
 * @see https://github.com/raveclassic/injectable-ts/issues/22
 */
export const objectDeps = () => {
  const entryPoint = injectable(
    { logger, movieService, authService },
    ({ authService, movieService, logger }): EntryPoint =>
      async (login, password): Promise<void> => {
        const token = authService.authorize(login, password)
        const movies = movieService.fetchMovies(token)

        logger.log(movies)
        logger.log('entryPoint(token):', token)
        logger.log('entryPoint(movie):', movies)
      }
  )

  // const testLogger: Logger = {
  //   log: () => {
  //     console.log('yeah, this is a logger')
  //   }}

  // const run = entryPoint({
  //   API_URL: 'https://my-api.com',
  //   DB: '{ some object }'

  //   // If I wanted to override the default logger this is how to do it.
  //   // LOGGER: testLogger,
  // })

  const run = entryPoint(configs)

  run('John Doe', 'qweqwe')
}

// --- MAIN ----------------------------------------------
/**
 * There is some confusion in the documentation and the new example clears
 * it up a bunch. Using the object is much simpler and doesn't require the
 * order to be correct.
 * 
 * @see https://github.com/raveclassic/injectable-ts/issues/22
 */
export const constructorDeps = () => {
  // This version requires functions to be in the correct order in 
  // injectable() param list + the runner function param list in
  // order for this to work.
  // 
  // Meaning that the dependencies passed into injectable() have to
  // be in the same order as the last param (run function) in order
  // for this to behave properly. I prefer the object version as that
  // allows it to be more dynamic when/if required.
  const entryPoint = injectable(
    movieService, authService, logger,
    (movieService: MovieService, authService: AuthService, logger: Logger): EntryPoint =>
      async (login, password): Promise<void> => {
        const token = authService.authorize(login, password)
        const movies = movieService.fetchMovies(token)

        logger.log(movies)
        logger.log('entryPoint(token):', token)
        logger.log('entryPoint(movie):', movies)
      }
  )

  const run = entryPoint(configs)

  run('John Doe', 'qweqwe')
}

/**
 * Combined dependencies
 * 
 * @see https://github.com/raveclassic/injectable-ts/tree/main/packages/core#combining-injectables
 */
export const combinedDeps = () => {
  const TA = token('a')<string>()
  const TZ = token('TZ')<string>()
  
  const options = {
    a: 'a',
    b: 'override!',
    c: 'hey',
    TZ: 'TZTZ', // Required, der
  }

  const b = injectable('b', TA, (a) => `[b()]: ${a}`)
  const c = injectable('c', TA, (a) => `\n[c()]: ${a}`)
  const d = injectable('z', TZ, (a) => `\n[d()]: ${a}`)
  const run = injectable(b, c, d, (b, c, d) => `[run()]: ${b} ${c} ${d}`)

  const response1 = run(options) // returns "override! c"
  const response2 = run({ ...options, b: 'ASD!', z: 'zzzz'}) // returns "override! c"
  
  console.log(response1)
  console.log(response2)
}

/**
 * Combined dependencies
 * 
 * @see https://github.com/raveclassic/injectable-ts/tree/main/packages/core#combining-injectables
 */
export const treeDeps = () => {
  console.log('[TODO]')
}

const services = {
  multipleTokens,
  logger,
  andricService,
}

/**
 * There is some confusion in the documentation and the new example clears
 * it up a bunch. Using the object is much simpler and doesn't require the
 * order to be correct.
 * 
 * @see https://github.com/raveclassic/injectable-ts/issues/22
 */
export const deepDeps = () => {
  const entryPoint = injectable(services, ({ multipleTokens, logger, andricService }): any =>
    async (name: any, nonsense: string): Promise<void> => {
      logger.log('name:', name)
      logger.log('nonsense:', nonsense)
      logger.log('anotherInjectable():', multipleTokens.fetchMovies('__TOKEN__'))

      console.log(andricService)
    }
  )

  const run = entryPoint(configs)

  // console.log('configs', configs)

  run('John Doe', 'qweqwe')
}