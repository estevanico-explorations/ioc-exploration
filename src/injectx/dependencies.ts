import { DB } from './types'

export const db: DB = {
  users: [{
    username: 'tarek',
  }, {
    username: 'ANDRIC',
    where: 'quincy',
  }]
}

export const logger = {
  error: () => {},
  log: () => {},
  console: () => {},
}

export const analytics = {
  error: () => { },
  log: () => { },
  console: () => { },
}
