import { token } from '@injectable-ts/core'

export const configs = {
  API_URL: 'https://my-api.com',
  DB: '{ some object }',
  
  FUNC: (a: any): void => {
    console.log('FUNC():', a)
  },

  ANDRIC: {
    NAME: 'Andric',
    GENDER: 'Trans Woman'
  }
}

export const apiUrl = token('API_URL')<string>()

export const db = token('DB')<string>()

interface Andric {
  NAME: string
  GENDER: string
}

export const andricName = token('ANDRIC')<Andric>()
export const someFunc = token('FUNC')<any>()

