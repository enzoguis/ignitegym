import AsyncStorage from '@react-native-async-storage/async-storage'
import { USER_STORAGE } from './storageConfig'
import { UserDTO } from '@dtos/UserDTO'

export async function storageUserSave(user: UserDTO) {
  await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user))
}

export async function storageUserGet() {
  const storage = await AsyncStorage.getItem(USER_STORAGE)

  if (!storage) {
    throw new Error('User not found.')
  }

  const user: UserDTO = (await storage) ? JSON.parse(storage) : {}

  return user
}

export async function storageUserRemove() {
  await AsyncStorage.removeItem(USER_STORAGE)
}
