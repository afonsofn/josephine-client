import { StyleSheet, View, FlatList, Keyboard } from 'react-native'
import { useEffect, useRef, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { io } from 'socket.io-client'

import TokyoImageButton from '@/components/TokyoImageButton'
import MainGradientBg from '@/components/MainGradientBg'
import ChatGradientBg from '@/components/ChatGradientBg'
import NeoTextField from '@/components/NeoTextField'
import ChatMessageBox from '@/components/ChatMessageBox'
import NeonStrip from '@/components/NeonStrip'

import { ChatInfo, ChatMessage } from '@/types/globalTypes'

export default function ChatRoom() {
  const { id } = useLocalSearchParams()
  // const [chatInfo, setChatInfo] = useState<ChatInfo | null>(null)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [text, setText] = useState('')
  const socket = io('http://localhost:3332')
  const flatListRef = useRef<FlatList>(null)

  // REFACT
  const user = {
    id: 1,
    firstName: 'Joe',
    lastName: 'Doe',
    profileImage:
      'https://media.licdn.com/dms/image/D4D03AQH04HQkye8_zg/profile-displayphoto-shrink_800_800/0/1692046464398?e=1707350400&v=beta&t=cHh_4lQ7KICrpLeR96EyFOyKbX1uL8vgtS9AtDuV77U',
  }

  const chatInfo = {
    firstName: 'Raul',
    lastName: 'Afonso',
    status: true,
    imageUrl:
      'https://media.licdn.com/dms/image/D4D03AQH04HQkye8_zg/profile-displayphoto-shrink_800_800/0/1692046464398?e=1707350400&v=beta&t=cHh_4lQ7KICrpLeR96EyFOyKbX1uL8vgtS9AtDuV77U',
    id: 3,
  }

  useEffect(() => {
    try {
      socket.emit('getAllMessages', {}, (allMessages: ChatMessage[]) =>
        setMessages(allMessages),
      )

      socket.on('message', (message: ChatMessage) => {
        setMessages((currentMessages) => [...currentMessages, message])

        scrollToEnd(true)
      })

      const keyboardDidShowListener = Keyboard.addListener(
        'keyboardDidShow',
        () => scrollToEnd(),
      )

      return () => {
        socket.off('message')
        keyboardDidShowListener.remove()
      }
    } catch (error) {
      console.error('Raul capturou o erro', error)
    }
  }, [])

  const sendMessage = () =>
    socket.emit(
      'sendMessage',
      {
        content: text,
        senderId: user.id,
        receiverId: chatInfo.id,
        contactId: 1,
      },
      () => setText(''),
    )

  const scrollToEnd = (delayed = false) =>
    setTimeout(() => flatListRef.current?.scrollToEnd(), delayed ? 100 : 0)

  const joinChatRoom = () =>
    socket.emit('joinChatRoom', { targetUserId: chatInfo.id, userId: user.id })

  return (
    <MainGradientBg>
      <View style={styles.header}>
        <NeonStrip
          onPress={() => router.push('/ContactList')}
          style={{ alignSelf: 'center' }}
        />

        <TokyoImageButton
          onPress={() => joinChatRoom()}
          imageUrl={user.profileImage}
        />
      </View>

      <ChatGradientBg
        isChatOnline={chatInfo?.status || false}
        chatName={chatInfo?.firstName + ' ' + chatInfo?.lastName}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={({ item }) => <ChatMessageBox message={item} />}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.messagesList}
          onContentSizeChange={() => scrollToEnd()}
          showsVerticalScrollIndicator={false}
        />
      </ChatGradientBg>

      <NeoTextField
        onChangeText={(text) => setText(text)}
        onPress={() => sendMessage()}
        value={text}
      />
    </MainGradientBg>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  messagesList: {
    paddingBottom: 24,
    paddingTop: 36,
  },
})

// const chatData = {
//   firstName: 'Raul',
//   lastName: 'Afonso',
//   messages: [
//     {
//       id: 1,
//       senderId: 1,
//       receiverId: 2,
//       content:
//         'Why do we use it? It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normallllllllllllll.',
//       createdAt: '14:29',
//       updatedAt: '14:29',
//       status: '',
//     },
//     {
//       id: 2,
//       senderId: 2,
//       receiverId: 1,
//       content:
//         'salve salve salve salve salve salvesalve  salve salve salve salveeeee ',
//       createdAt: '14:29',
//       updatedAt: '14:29',
//       status: '',
//     },
//     // {
//     //   id: 3,
//     //   senderId: 1,
//     //   receiverId: 2,
//     //   content:
//     //     'Raulzin iug iu yasd iuyasiu hkuasdu hasduy asd asdiuy asdiu y uyasd ouyiasdu yasdiouy asdou yias ouyiy iu yas diuya iuyd iuya suidyasiu ydas iuasiduyi uyasdiuy as klasdkluasoiu asdiou asoiu asdio u',
//     //   createdAt: '14:29',
//     //   updatedAt: '14:29',
//     //   status: '',
//     // },
//     {
//       id: 4,
//       senderId: 2,
//       receiverId: 1,
//       content: 'salve',
//       createdAt: '01:29',
//       updatedAt: '14:29',
//       status: '',
//     },
//     {
//       id: 5,
//       senderId: 1,
//       receiverId: 2,
//       content:
//         'Raulzin iug iu yasd iuyasiu hkuasdu hasduy asd asdiuy asdiu y uyasd ouyiasdu yasdiouy asdou yias ouyiy iu yas diuya iuyd iuya suidyasiu ydas iuasiduyi uyasdiuy as klasdkluasoiu asdiou asoiu asdio u',
//       createdAt: '14:29',
//       updatedAt: '14:29',
//       status: '',
//     },
//     {
//       id: 6,
//       senderId: 2,
//       receiverId: 1,
//       content: 'salve salve salve salve',
//       createdAt: '14:29',
//       updatedAt: '14:29',
//       status: '',
//     },
//     {
//       id: 7,
//       senderId: 1,
//       receiverId: 2,
//       content:
//         'Raulzin iug iu yasd iuyasiu hkuasdu hasduy asd asdiuy asdiu y uyasd ouyiasdu yasdiouy asdou yias ouyiy iu yas diuya iuyd iuya suidyasiu ydas iuasiduyi uyasdiuy as klasdkluasoiu asdiou asoiu asdio u',
//       createdAt: '14:29',
//       updatedAt: '14:29',
//       status: '',
//     },
//     {
//       id: 8,
//       senderId: 2,
//       receiverId: 1,
//       content: 'salve',
//       createdAt: '14:29',
//       updatedAt: '14:29',
//       status: '',
//     },
//     {
//       id: 9,
//       senderId: 1,
//       receiverId: 2,
//       content:
//         'Raulzin iug iu yasd iuyasiu hkuasdu hasduy asd asdiuy asdiu y uyasd ouyiasdu yasdiouy asdou yias ouyiy iu yas diuya iuyd iuya suidyasiu ydas iuasiduyi uyasdiuy as klasdkluasoiu asdiou asoiu asdio u',
//       createdAt: '14:29',
//       updatedAt: '14:29',
//       status: '',
//     },
//     {
//       id: 10,
//       senderId: 2,
//       receiverId: 1,
//       content: 'salve',
//       createdAt: '14:29',
//       updatedAt: '14:29',
//       status: '',
//     },
//     {
//       id: 11,
//       senderId: 1,
//       receiverId: 2,
//       content:
//         'Raulzin iug iu yasd iuyasiu hkuasdu hasduy asd asdiuy asdiu y uyasd ouyiasdu yasdiouy asdou yias ouyiy iu yas diuya iuyd iuya suidyasiu ydas iuasiduyi uyasdiuy as klasdkluasoiu asdiou asoiu asdio u',
//       createdAt: '14:29',
//       updatedAt: '14:29',
//       status: '',
//     },
//     {
//       id: 12,
//       senderId: 2,
//       receiverId: 1,
//       content: 'salve',
//       createdAt: '14:29',
//       updatedAt: '14:29',
//       status: '',
//     },
//     {
//       id: 13,
//       senderId: 1,
//       receiverId: 2,
//       content:
//         'Raulzin iug iu yasd iuyasiu hkuasdu hasduy asd asdiuy asdiu y uyasd ouyiasdu yasdiouy asdou yias ouyiy iu yas diuya iuyd iuya suidyasiu ydas iuasiduyi uyasdiuy as klasdkluasoiu asdiou asoiu asdio u',
//       createdAt: '14:29',
//       updatedAt: '14:29',
//       status: '',
//     },
//   ],
//   status: true,
//   imageUrl:
//     'https://media.licdn.com/dms/image/D4D03AQH04HQkye8_zg/profile-displayphoto-shrink_800_800/0/1692046464398?e=1707350400&v=beta&t=cHh_4lQ7KICrpLeR96EyFOyKbX1uL8vgtS9AtDuV77U',
//   id: 2,
// }
