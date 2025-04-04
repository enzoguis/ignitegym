import { storageAuthTokenGet } from '@storage/storageToken'
import { AppError } from '@utils/AppError'
import axios, { AxiosInstance } from 'axios'

type SingOut = () => void

type APIInstanceProps = AxiosInstance & {
  registerInterceptTokenManager: (signOut: SingOut) => () => void
}

const api = axios.create({
  baseURL: 'http://192.168.3.4:3333',
}) as APIInstanceProps

api.registerInterceptTokenManager = (signOut) => {
  const interceptTokenManager = api.interceptors.response.use(
    (response) => response,
    async (requestError) => {
      if (requestError?.response?.status === 401) {
        if (
          requestError.response.data.message === 'token.expired' ||
          requestError.response.data.message === 'token.invalid'
        ) {
          const { refresh_token } = await storageAuthTokenGet()

          if (!refresh_token) {
            signOut()
            return Promise.reject(requestError)
          }
        }

        signOut()
      }

      if (requestError.response && requestError.response.data) {
        return Promise.reject(new AppError(requestError.response.data.message))
      }

      return Promise.reject('Erro no servidor. Tente novamente mais tarde.')
    }
  )
  return () => {
    api.interceptors.response.eject(interceptTokenManager)
  }
}

export { api }
