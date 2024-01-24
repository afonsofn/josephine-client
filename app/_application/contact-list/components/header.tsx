import { StyleSheet, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { router } from 'expo-router'

import { setUserData } from '@/store/slices/userSlice'

import useSocket from '@/socket/index'

import { ConfigIcon, NewChatIcon } from '@/components/icons'
import TokyoButton from '@/components/TokyoButton'

import { useAuthToken } from '@/utils'
import { useCallback } from 'react'

export default function ContactListHeader() {
  const dispatch = useDispatch()
  const { clearToken } = useAuthToken()
  const socket = useSocket()

  const handleLogout = useCallback(() => {
    clearToken()
    dispatch(setUserData(null))
    socket?.disconnect()
    router.push('/')
  }, [clearToken, dispatch, socket])

  return (
    <View style={styles.header}>
      <TokyoButton
        title="logout for now"
        subtitle="新しいチャット"
        Icon={() => <NewChatIcon />}
        onPress={handleLogout}
      />

      <TokyoButton
        title="config"
        subtitle="構成ハブ"
        Icon={() => <ConfigIcon />}
        onPress={() => ''}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 48,
  },
})
