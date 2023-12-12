import { StyleSheet, View, ScrollView } from 'react-native'
import { useEffect, useState } from 'react'
import { router } from 'expo-router'

import { ConfigIcon, SearchIcon, NewChatIcon } from '@/components/icons'
import MainGradientBg from '@/components/MainGradientBg'
import TokyoButton from '@/components/TokyoButton'
import NeonBars from '@/components/NeonBars'
import ChatBox from '@/components/ChatBox'
import Text from '@/components/Text'

import { ChatBoxInfo } from '@/types/globalTypes'

export default function ContactList() {
  const [chatList, setChatList] = useState<ChatBoxInfo[]>([])

  useEffect(() => {
    setChatList([
      {
        chatName: 'Raul Afonso',
        lastMessage:
          'Lorem Ipsum is simply dummy text of the printing and Lorem Ipsum is simply dummy text of the printing and',
        lastMessageTime: '14:32',
        isChatOnline: true,
        chatImage:
          'https://media.licdn.com/dms/image/D4D03AQH04HQkye8_zg/profile-displayphoto-shrink_800_800/0/1692046464398?e=1707350400&v=beta&t=cHh_4lQ7KICrpLeR96EyFOyKbX1uL8vgtS9AtDuV77U',
        chatId: 1,
      },
      {
        chatName: 'Mari Cavalcanti',
        lastMessage:
          'Lorem Ipsum is simply dummy text of the printing and Lorem Ipsum is simply dummy text of the printing and',
        lastMessageTime: '01:21',
        isChatOnline: false,
        chatId: 2,
      },
      {
        chatName: 'Raul Afonso',
        lastMessage:
          'Lorem Ipsum is simply dummy text of the printing and Lorem Ipsum is simply dummy text of the printing and',
        lastMessageTime: '14:32',
        isChatOnline: true,
        chatId: 1,
      },
      {
        chatName: 'Mari Cavalcanti',
        lastMessage:
          'Lorem Ipsum is simply dummy text of the printing and Lorem Ipsum is simply dummy text of the printing and',
        lastMessageTime: '01:21',
        isChatOnline: false,
        chatId: 2,
      },
      {
        chatName: 'Raul Afonso',
        lastMessage:
          'Lorem Ipsum is simply dummy text of the printing and Lorem Ipsum is simply dummy text of the printing and',
        lastMessageTime: '14:32',
        isChatOnline: true,
        chatId: 1,
      },
      {
        chatName: 'Mari Cavalcanti',
        lastMessage:
          'Lorem Ipsum is simply dummy text of the printing and Lorem Ipsum is simply dummy text of the printing and',
        lastMessageTime: '01:21',
        isChatOnline: false,
        chatId: 2,
      },
      {
        chatName: 'Raul Afonso',
        lastMessage:
          'Lorem Ipsum is simply dummy text of the printing and Lorem Ipsum is simply dummy text of the printing and',
        lastMessageTime: '14:32',
        isChatOnline: true,
        chatId: 1,
      },
      {
        chatName: 'Mari Cavalcanti',
        lastMessage:
          'Lorem Ipsum is simply dummy text of the printing and Lorem Ipsum is simply dummy text of the printing and',
        lastMessageTime: '01:21',
        isChatOnline: false,
        chatId: 2,
      },
      {
        chatName: 'Raul Afonso',
        lastMessage:
          'Lorem Ipsum is simply dummy text of the printing and Lorem Ipsum is simply dummy text of the printing and',
        lastMessageTime: '14:32',
        isChatOnline: true,
        chatId: 1,
      },
      {
        chatName: 'Mari Cavalcanti',
        lastMessage:
          'Lorem Ipsum is simply dummy text of the printing and Lorem Ipsum is simply dummy text of the printing and',
        lastMessageTime: '01:21',
        isChatOnline: false,
        chatId: 2,
      },
      {
        chatName: 'Raul Afonso',
        lastMessage:
          'Lorem Ipsum is simply dummy text of the printing and Lorem Ipsum is simply dummy text of the printing and',
        lastMessageTime: '14:32',
        isChatOnline: true,
        chatId: 1,
      },
      {
        chatName: 'Mari Cavalcanti',
        lastMessage:
          'Lorem Ipsum is simply dummy text of the printing and Lorem Ipsum is simply dummy text of the printing and',
        lastMessageTime: '01:21',
        isChatOnline: false,
        chatId: 2,
      },
      {
        chatName: 'Raul Afonso',
        lastMessage:
          'Lorem Ipsum is simply dummy text of the printing and Lorem Ipsum is simply dummy text of the printing and',
        lastMessageTime: '14:32',
        isChatOnline: true,
        chatId: 1,
      },
      {
        chatName: 'Mari Cavalcanti',
        lastMessage:
          'Lorem Ipsum is simply dummy text of the printing and Lorem Ipsum is simply dummy text of the printing and',
        lastMessageTime: '01:21',
        isChatOnline: false,
        chatId: 2,
      },
      {
        chatName: 'Raul Afonso',
        lastMessage:
          'Lorem Ipsum is simply dummy text of the printing and Lorem Ipsum is simply dummy text of the printing and',
        lastMessageTime: '14:32',
        isChatOnline: true,
        chatId: 1,
      },
      {
        chatName: 'Mari Cavalcanti',
        lastMessage:
          'Lorem Ipsum is simply dummy text of the printing and Lorem Ipsum is simply dummy text of the printing and',
        lastMessageTime: '01:21',
        isChatOnline: false,
        chatId: 2,
      },
    ])
  }, [])

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
              chatName={chat.chatName}
              lastMessage={chat.lastMessage}
              lastMessageTime={chat.lastMessageTime}
              isChatOnline={chat.isChatOnline}
              chatImage={chat.chatImage}
              chatId={chat.chatId}
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
