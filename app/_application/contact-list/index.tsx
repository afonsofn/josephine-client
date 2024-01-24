import { StyleSheet, View, ScrollView } from 'react-native'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { UserState } from '@/store/slices/userSlice'

import { UserService } from '../../_services/abstractions/user.service'

import { SearchIcon } from '@/components/icons'
import MainGradientBg from '@/components/MainGradientBg'
import TokyoButton from '@/components/TokyoButton'
import NeonBars from '@/components/NeonBars'
import ChatBox from '@/components/ChatBox'
import Text from '@/components/Text'

import useSocketListener from '@/utils/useSocketListener'

import { ChatBoxInfo, ChatMessage } from '@/types'
import ContactListHeader from './components/header'

export default function NewContactList() {
  const userService = UserService.getInstance()

  const [userContacts, setUserContacts] = useState<ChatBoxInfo[]>([])

  const user = useSelector((state: UserState) => state?.userState.user)

  const loadUserContacts = async () => {
    const userContactsResponse = await userService.getUserContacts()

    setUserContacts(userContactsResponse)
  }

  const handleMessage = async (message: ChatMessage) => {
    if (!message) return

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
      <ContactListHeader />

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
