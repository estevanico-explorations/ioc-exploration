import { injectable, token } from '@injectable-ts/core'

// --- TOKENS --------------------------------------
interface AuthService {
  authorize(login: string, password: string): string
}

interface MovieService {
  fetchMovies(authToken: string): string[]
}

interface Logger {
  log(...args: readonly unknown[]): void
}

interface EntryPoint {
  (login: string, password: string): Promise<void>
}

// --- INJECTABLES -----------------------------------------
const apiUrl = token('API_URL')<string>()
const db = token('DB')<any>()

const logger = injectable('LOGGER', db, (): Logger => console)

const authService = injectable(apiUrl, (apiUrl: string): AuthService => ({
  authorize: (login: string, password: string): string => `auth token`
}))

const movieService = injectable(apiUrl, (apiUrl: string): MovieService => ({
  fetchMovies: (authToken: string): string[] => ['movie()'],
}))

// Don't forget to add the log params here :)
const loggerOverride: Logger = { log: (args) => { console.log('[OVERRIDDEN LOGGER]', args) }}

const configs = {
  API_URL: 'https://my-api.com',
  DB: '{ some object }'
}

// --- MAIN ----------------------------------------------
const mainOverriddenDeps = () => {
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
const mainObjectDeps = () => {
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
const mainConstructorDeps = () => {
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
 * Regardless of which option is chosen the function body needs to still be
 * in order of calls because if one function requires the output of a another
 * (dependant values) then they must be stacked correctly.
 */
// --- RUN APPLICATIONS ----------------------------
console.clear()

// console.log('--- mainConstructorDeps() -----------------------')
console.log('--- OBJECT PARAM --------------------------------')
mainObjectDeps()

// console.log('--- mainObjectDeps() ----------------------------')
console.log('\n--- FUNCTION LIST PARAM -------------------------')
mainConstructorDeps()

// console.log('--- mainOverriddenDeps() -----------------------')
console.log('\n--- OVERRIDDEN DEPS -----------------------------')
mainOverriddenDeps()

// --- OUTPUT --------------------------------------
// 
// --- @injectable-ts/core -------------------------
// entryPoint(logger) [ 'movie()' ]
// entryPoint(token): auth token
// entryPoint(movie): [ 'movie()' ]