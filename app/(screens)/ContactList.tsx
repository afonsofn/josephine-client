import { StyleSheet, View, ScrollView } from 'react-native'
import { useEffect, useState } from 'react'
import { router } from 'expo-router'

import { ConfigIcon, SearchIcon, NewChatIcon } from '@/components/icons'
import MainGradientBg from '@/components/MainGradientBg'
import TokyoButton from '@/components/TokyoButton'
import NeonBars from '@/components/NeonBars'
import ChatBox from '@/components/ChatBox'
import Text from '@/components/Text'

import { ChatBoxInfo, ChatMessage, UserInfo } from '@/types'

import { getUserContacts } from '@/api'
import { useDispatch, useSelector } from 'react-redux'
import { useAuthToken } from '@/utils'
import { UserState, setUserData } from '@/store/slices/userSlice'
import useSocketListener from '@/utils/useSocketListener'
import useSocket from '@/socket/index'

export default function ContactList() {
  const [userContacts, setUserContacts] = useState<ChatBoxInfo[]>([])

  const user: UserInfo | null = useSelector(
    (state: UserState) => state?.userState.user,
  )

  const dispatch = useDispatch()
  const { clearToken } = useAuthToken()
  const socket = useSocket()

  const loadUserContacts = async () => {
    const userContactsResponse = await getUserContacts()

    setUserContacts(userContactsResponse)
  }
  const handleMessage = async (message: ChatMessage) => {
    if (message.senderId === user?.id || message.receiverId === user?.id)
      await loadUserContacts()
  }

  useSocketListener('message', handleMessage)
  useSocketListener('lastMessagesReaded', handleMessage)

  useEffect(() => {
    loadUserContacts()
  }, [])

  return (
    <MainGradientBg>
      <View style={styles.header}>
        <TokyoButton
          title="logout for now"
          subtitle="新しいチャット"
          Icon={() => <NewChatIcon />}
          onPress={() => {
            clearToken()
            dispatch(setUserData(null))
            socket?.disconnect()

            router.push('/')
          }}
        />

        <TokyoButton
          title="config"
          subtitle="構成ハブ"
          Icon={() => <ConfigIcon />}
          onPress={() => router.push('/ConfigPanel')}
        />
      </View>

      <View>
        <Text accentColor>ジョセフィーヌのアプリ</Text>
        <NeonBars />
      </View>

      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.contactList}>
          {userContacts.map((chat, index) => (
            <ChatBox
              chatName={chat.firstName + ' ' + chat.lastName}
              lastMessage={chat.lastMessage}
              chatImage={chat.imageUrl}
              chatId={chat.userId}
              key={index}
            />
          ))}
        </ScrollView>
      </View>

      <View style={styles.footer}>
        <NeonBars rightSide />

        <TokyoButton
          title="search"
          subtitle="検索"
          Icon={() => <SearchIcon />}
          onPress={() => ''}
        />
      </View>
    </MainGradientBg>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 48,
  },
  contactList: {
    gap: 12,
    marginVertical: 24,
    paddingBottom: 36,
  },
  footer: {
    alignItems: 'flex-end',
    gap: 12,
  },
})
