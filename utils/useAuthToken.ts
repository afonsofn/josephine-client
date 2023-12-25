import * as Keychain from 'react-native-keychain'

const useAuthToken = () => {
  const saveToken = async (token: string) => {
    console.log('token', token)

    await Keychain.setGenericPassword('userToken', token)
  }

  const getToken = async () => {
    const credentials = await Keychain.getGenericPassword()

    if (credentials) return credentials.password

    return null
  }

  const clearToken = async () => await Keychain.resetGenericPassword()

  return { saveToken, getToken, clearToken }
}

export default useAuthToken
