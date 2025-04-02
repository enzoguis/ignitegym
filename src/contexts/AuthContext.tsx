import { UserDTO } from '@dtos/UserDTO'
import { createContext, ReactNode } from 'react'

export type AuthContextDataProps = {
  user: UserDTO
}

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
)

type AuthContextProviderProps = {
  children: ReactNode
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  return (
    <AuthContext.Provider
      value={{
        user: {
          id: '1',
          name: 'Enzo',
          email: 'enzo@email.com',
          avatar: 'https://github.com/enzoguis.png',
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
