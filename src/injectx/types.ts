export interface UserRepository {
  db: DB
}

export interface User {
  username: string
  where?: string
}

export interface DB {
  users: User[]
}
