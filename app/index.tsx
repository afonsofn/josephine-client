import { View } from 'react-native'
import { useState } from 'react'
import { router } from 'expo-router'
import { useDispatch } from 'react-redux'

import Text from '@/components/Text'
import MainGradientBg from '@/components/MainGradientBg'
import NeoTextField from '@/components/NeoTextField'

import { getUserInfo, loginByEmail, registerByEmail, verifyEmail } from '../api'
import { useAuthToken } from '@/utils'
import { setUserData } from '@/store/slices/userSlice'
import socket from '../socket'

export default function ContactList() {
  const [email, setEmail] = useState('joe@doe.com')
  const [password, setPassword] = useState('Password@123')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [nickname, setNickname] = useState('')
  const [verificationCode, setVerificationCode] = useState('')

  const { saveToken } = useAuthToken()
  const dispatch = useDispatch()

  const logon = async () => {
    await registerByEmail({
      email,
      password,
      firstName,
      lastName,
      nickname,
    })
  }

  const verify = async () => {
    // eslint-disable-next-line camelcase
    const { access_token } = await verifyEmail({ email, verificationCode })

    await saveToken(access_token)
  }

  const login = async () => {
    // eslint-disable-next-line camelcase
    const { access_token } = await loginByEmail({
      email,
      password,
    })

    await saveToken(access_token)

    const userInfo = await getUserInfo()

    socket.emit('connectingSocket', userInfo.id)

    dispatch(setUserData(userInfo))

    router.push('/ContactList')
  }

  return (
    <MainGradientBg>
      <View>
        <Text>email</Text>
        <NeoTextField
          onChangeText={(text) => setEmail(text)}
          onPress={() => ''}
          value={email}
        />
        <Text>password</Text>
        <NeoTextField
          onChangeText={(text) => setPassword(text)}
          onPress={() => login()}
          value={password}
        />
        <Text>firstName</Text>
        <NeoTextField
          onChangeText={(text) => setFirstName(text)}
          onPress={() => ''}
          value={firstName}
        />
        <Text>lastName</Text>
        <NeoTextField
          onChangeText={(text) => setLastName(text)}
          onPress={() => ''}
          value={lastName}
        />
        <Text>nickname</Text>
        <NeoTextField
          onChangeText={(text) => setNickname(text)}
          onPress={() => logon()}
          value={nickname}
        />
        <Text>verificationCode</Text>
        <NeoTextField
          onChangeText={(text) => setVerificationCode(text)}
          onPress={() => verify()}
          value={verificationCode}
        />
      </View>
    </MainGradientBg>
  )
}

// REFACT WHEN CREATE THE STYLE FOR IT
// <View
//   style={{ alignItems: 'center', justifyContent: 'center', height: '100%' }}
// >
//   <Text style={{ color: 'blue' }}>Hello</Text>
//   <Link href="/ContactList">
//     <Text style={{ color: 'red' }}>ContactList</Text>
//   </Link>
// </View>
