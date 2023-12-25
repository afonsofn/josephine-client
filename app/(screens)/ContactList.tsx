import { StyleSheet, View, ScrollView } from 'react-native'
import { useEffect, useState } from 'react'
import { router } from 'expo-router'
import { io } from 'socket.io-client'

import { ConfigIcon, SearchIcon, NewChatIcon } from '@/components/icons'
import MainGradientBg from '@/components/MainGradientBg'
import TokyoButton from '@/components/TokyoButton'
import NeonBars from '@/components/NeonBars'
import ChatBox from '@/components/ChatBox'
import Text from '@/components/Text'

import { ChatBoxInfo, ChatMessage } from '@/types/globalTypes'

import { getMyContacts } from '@/api'

const user = {
  id: 1,
  firstName: 'Joe',
  lastName: 'Doe',
  profileImage:
    'https://media.licdn.com/dms/image/D4D03AQH04HQkye8_zg/profile-displayphoto-shrink_800_800/0/1692046464398?e=1707350400&v=beta&t=cHh_4lQ7KICrpLeR96EyFOyKbX1uL8vgtS9AtDuV77U',
}

export default function ContactList() {
  const [chatList, setChatList] = useState<ChatBoxInfo[]>([])

  const socket = io('http://localhost:3332')

  useEffect(() => {
    socket.on('message', (message: ChatMessage) => {
      if (message.senderId === user.id || message.receiverId === user.id) {
        getMyContacts().then((contacts) => setChatList(contacts))
      }
    })

    getMyContacts().then((contacts) => setChatList(contacts))
  }, [])

  function formatTime(dateTimeString: string) {
    const date = new Date(dateTimeString)
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')

    return `${hours}:${minutes}`
  }

  return (
    <MainGradientBg>
      <View style={styles.header}>
        <TokyoButton
          title="new chat"
          subtitle="新しいチャット"
          Icon={() => <NewChatIcon />}
          onPress={() => ''}
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
          {chatList.map((chat, index) => (
            <ChatBox
              chatName={chat.firstName + ' ' + chat.lastName}
              lastMessage={chat.lastMessage?.content}
              lastMessageTime={formatTime(chat.lastMessage?.createdAt)}
              isChatOnline={chat.status !== 'offline'}
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

// setChatList([
//   {
//     chatName: 'Raul Afonso',
//     lastMessage:
//       'Lorem Ipsum is simply dummy text of the printing and Lorem Ipsum is simply dummy text of the printing and',
//     lastMessageTime: '14:32',
//     isChatOnline: true,
//     chatImage:
//       'https://media.licdn.com/dms/image/D4D03AQH04HQkye8_zg/profile-displayphoto-shrink_800_800/0/1692046464398?e=1707350400&v=beta&t=cHh_4lQ7KICrpLeR96EyFOyKbX1uL8vgtS9AtDuV77U',
//     chatId: 1,
//   },
//   {
//     chatName: 'Mari Cavalcanti',
//     lastMessage:
//       'Lorem Ipsum is simply dummy text of the printing and Lorem Ipsum is simply dummy text of the printing and',
//     lastMessageTime: '01:21',
//     isChatOnline: false,
//     chatId: 2,
//   },
//   {
//     chatName: 'Raul Afonso',
//     lastMessage:
//       'Lorem Ipsum is simply dummy text of the printing and Lorem Ipsum is simply dummy text of the printing and',
//     lastMessageTime: '14:32',
//     isChatOnline: true,
//     chatId: 1,
//   },
//   {
//     chatName: 'Mari Cavalcanti',
//     lastMessage:
//       'Lorem Ipsum is simply dummy text of the printing and Lorem Ipsum is simply dummy text of the printing and',
//     lastMessageTime: '01:21',
//     isChatOnline: false,
//     chatId: 2,
//   },
//   {
//     chatName: 'Raul Afonso',
//     lastMessage:
//       'Lorem Ipsum is simply dummy text of the printing and Lorem Ipsum is simply dummy text of the printing and',
//     lastMessageTime: '14:32',
//     isChatOnline: true,
//     chatId: 1,
//   },
//   {
//     chatName: 'Mari Cavalcanti',
//     lastMessage:
//       'Lorem Ipsum is simply dummy text of the printing and Lorem Ipsum is simply dummy text of the printing and',
//     lastMessageTime: '01:21',
//     isChatOnline: false,
//     chatId: 2,
//   },
//   {
//     chatName: 'Raul Afonso',
//     lastMessage:
//       'Lorem Ipsum is simply dummy text of the printing and Lorem Ipsum is simply dummy text of the printing and',
//     lastMessageTime: '14:32',
//     isChatOnline: true,
//     chatId: 1,
//   },
//   {
//     chatName: 'Mari Cavalcanti',
//     lastMessage:
//       'Lorem Ipsum is simply dummy text of the printing and Lorem Ipsum is simply dummy text of the printing and',
//     lastMessageTime: '01:21',
//     isChatOnline: false,
//     chatId: 2,
//   },
//   {
//     chatName: 'Raul Afonso',
//     lastMessage:
//       'Lorem Ipsum is simply dummy text of the printing and Lorem Ipsum is simply dummy text of the printing and',
//     lastMessageTime: '14:32',
//     isChatOnline: true,
//     chatId: 1,
//   },
//   {
//     chatName: 'Mari Cavalcanti',
//     lastMessage:
//       'Lorem Ipsum is simply dummy text of the printing and Lorem Ipsum is simply dummy text of the printing and',
//     lastMessageTime: '01:21',
//     isChatOnline: false,
//     chatId: 2,
//   },
//   {
//     chatName: 'Raul Afonso',
//     lastMessage:
//       'Lorem Ipsum is simply dummy text of the printing and Lorem Ipsum is simply dummy text of the printing and',
//     lastMessageTime: '14:32',
//     isChatOnline: true,
//     chatId: 1,
//   },
//   {
//     chatName: 'Mari Cavalcanti',
//     lastMessage:
//       'Lorem Ipsum is simply dummy text of the printing and Lorem Ipsum is simply dummy text of the printing and',
//     lastMessageTime: '01:21',
//     isChatOnline: false,
//     chatId: 2,
//   },
//   {
//     chatName: 'Raul Afonso',
//     lastMessage:
//       'Lorem Ipsum is simply dummy text of the printing and Lorem Ipsum is simply dummy text of the printing and',
//     lastMessageTime: '14:32',
//     isChatOnline: true,
//     chatId: 1,
//   },
//   {
//     chatName: 'Mari Cavalcanti',
//     lastMessage:
//       'Lorem Ipsum is simply dummy text of the printing and Lorem Ipsum is simply dummy text of the printing and',
//     lastMessageTime: '01:21',
//     isChatOnline: false,
//     chatId: 2,
//   },
//   {
//     chatName: 'Raul Afonso',
//     lastMessage:
//       'Lorem Ipsum is simply dummy text of the printing and Lorem Ipsum is simply dummy text of the printing and',
//     lastMessageTime: '14:32',
//     isChatOnline: true,
//     chatId: 1,
//   },
//   {
//     chatName: 'Mari Cavalcanti',
//     lastMessage:
//       'Lorem Ipsum is simply dummy text of the printing and Lorem Ipsum is simply dummy text of the printing and',
//     lastMessageTime: '01:21',
//     isChatOnline: false,
//     chatId: 2,
//   },
// ])
