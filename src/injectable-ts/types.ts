// --- TOKENS --------------------------------------
export interface AuthService {
  authorize(login: string, password: string): string
}

export interface MovieService {
  fetchMovies(authToken: string): string[]
}

export interface AndricService {
  mahName(): string
}

export interface Logger {
  log(...args: readonly unknown[]): void
}

export interface EntryPoint {
  (login: string, password: string): Promise<void>
}