import { StyleSheet, View, FlatList, Keyboard } from 'react-native'
import { useEffect, useRef, useState } from 'react'
import { router } from 'expo-router'

import TokyoImageButton from '@/components/TokyoImageButton'
import MainGradientBg from '@/components/MainGradientBg'
import ChatGradientBg from '@/components/ChatGradientBg'
import NeoTextField from '@/components/NeoTextField'
import ChatMessage from '@/components/ChatMessage'
import NeonStrip from '@/components/NeonStrip'

import { ChatInfo } from '@/types/globalTypes'

export default function ChatRoom() {
  // const { id } = useLocalSearchParams()
  const [chatInfo, setChatInfo] = useState<ChatInfo>()

  const [text, setText] = useState('')

  // REFACT
  const user = {
    userId: 1,
    profileImage:
      'https://media.licdn.com/dms/image/D4D03AQH04HQkye8_zg/profile-displayphoto-shrink_800_800/0/1692046464398?e=1707350400&v=beta&t=cHh_4lQ7KICrpLeR96EyFOyKbX1uL8vgtS9AtDuV77U',
  }

  const flatListRef = useRef<FlatList>(null)
  const chatData = {
    chatName: 'Raul Afonso',
    messages: [
      {
        id: 1,
        senderId: 1,
        receiverId: 2,
        content:
          'Why do we use it? It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normallllllllllllll.',
        createdAt: '14:29',
        updatedAt: '14:29',
        status: '',
      },
      {
        id: 2,
        senderId: 2,
        receiverId: 1,
        content:
          'salve salve salve salve salve salvesalve  salve salve salve salveeeee ',
        createdAt: '14:29',
        updatedAt: '14:29',
        status: '',
      },
      // {
      //   id: 3,
      //   senderId: 1,
      //   receiverId: 2,
      //   content:
      //     'Raulzin iug iu yasd iuyasiu hkuasdu hasduy asd asdiuy asdiu y uyasd ouyiasdu yasdiouy asdou yias ouyiy iu yas diuya iuyd iuya suidyasiu ydas iuasiduyi uyasdiuy as klasdkluasoiu asdiou asoiu asdio u',
      //   createdAt: '14:29',
      //   updatedAt: '14:29',
      //   status: '',
      // },
      {
        id: 4,
        senderId: 2,
        receiverId: 1,
        content: 'salve',
        createdAt: '01:29',
        updatedAt: '14:29',
        status: '',
      },
      {
        id: 5,
        senderId: 1,
        receiverId: 2,
        content:
          'Raulzin iug iu yasd iuyasiu hkuasdu hasduy asd asdiuy asdiu y uyasd ouyiasdu yasdiouy asdou yias ouyiy iu yas diuya iuyd iuya suidyasiu ydas iuasiduyi uyasdiuy as klasdkluasoiu asdiou asoiu asdio u',
        createdAt: '14:29',
        updatedAt: '14:29',
        status: '',
      },
      {
        id: 6,
        senderId: 2,
        receiverId: 1,
        content: 'salve salve salve salve',
        createdAt: '14:29',
        updatedAt: '14:29',
        status: '',
      },
      {
        id: 7,
        senderId: 1,
        receiverId: 2,
        content:
          'Raulzin iug iu yasd iuyasiu hkuasdu hasduy asd asdiuy asdiu y uyasd ouyiasdu yasdiouy asdou yias ouyiy iu yas diuya iuyd iuya suidyasiu ydas iuasiduyi uyasdiuy as klasdkluasoiu asdiou asoiu asdio u',
        createdAt: '14:29',
        updatedAt: '14:29',
        status: '',
      },
      {
        id: 8,
        senderId: 2,
        receiverId: 1,
        content: 'salve',
        createdAt: '14:29',
        updatedAt: '14:29',
        status: '',
      },
      {
        id: 9,
        senderId: 1,
        receiverId: 2,
        content:
          'Raulzin iug iu yasd iuyasiu hkuasdu hasduy asd asdiuy asdiu y uyasd ouyiasdu yasdiouy asdou yias ouyiy iu yas diuya iuyd iuya suidyasiu ydas iuasiduyi uyasdiuy as klasdkluasoiu asdiou asoiu asdio u',
        createdAt: '14:29',
        updatedAt: '14:29',
        status: '',
      },
      {
        id: 10,
        senderId: 2,
        receiverId: 1,
        content: 'salve',
        createdAt: '14:29',
        updatedAt: '14:29',
        status: '',
      },
      {
        id: 11,
        senderId: 1,
        receiverId: 2,
        content:
          'Raulzin iug iu yasd iuyasiu hkuasdu hasduy asd asdiuy asdiu y uyasd ouyiasdu yasdiouy asdou yias ouyiy iu yas diuya iuyd iuya suidyasiu ydas iuasiduyi uyasdiuy as klasdkluasoiu asdiou asoiu asdio u',
        createdAt: '14:29',
        updatedAt: '14:29',
        status: '',
      },
      {
        id: 12,
        senderId: 2,
        receiverId: 1,
        content: 'salve',
        createdAt: '14:29',
        updatedAt: '14:29',
        status: '',
      },
      {
        id: 13,
        senderId: 1,
        receiverId: 2,
        content:
          'Raulzin iug iu yasd iuyasiu hkuasdu hasduy asd asdiuy asdiu y uyasd ouyiasdu yasdiouy asdou yias ouyiy iu yas diuya iuyd iuya suidyasiu ydas iuasiduyi uyasdiuy as klasdkluasoiu asdiou asoiu asdio u',
        createdAt: '14:29',
        updatedAt: '14:29',
        status: '',
      },
    ],
    isChatOnline: true,
    chatImage:
      'https://media.licdn.com/dms/image/D4D03AQH04HQkye8_zg/profile-displayphoto-shrink_800_800/0/1692046464398?e=1707350400&v=beta&t=cHh_4lQ7KICrpLeR96EyFOyKbX1uL8vgtS9AtDuV77U',
    chatId: 1,
  }

  useEffect(() => {
    setChatInfo(chatData)

    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => flatListRef.current?.scrollToEnd(),
    )

    return () => {
      keyboardDidShowListener.remove()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <MainGradientBg>
      <View style={styles.header}>
        <NeonStrip
          onPress={() => router.push('/ContactList')}
          style={{ alignSelf: 'center' }}
        />

        <TokyoImageButton
          onPress={() => console.log('profile')}
          imageUrl={user.profileImage}
        />
      </View>

      <ChatGradientBg
        isChatOnline={chatInfo?.isChatOnline || false}
        chatName={chatInfo?.chatName}
      >
        <FlatList
          ref={flatListRef}
          data={chatInfo?.messages}
          renderItem={({ item }) => <ChatMessage message={item} />}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.messagesList}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
          showsVerticalScrollIndicator={false}
        />
      </ChatGradientBg>

      <NeoTextField
        onChangeText={(text) => setText(text)}
        onPress={() =>
          setChatInfo({
            ...chatData,
            messages: [
              ...chatData.messages,
              {
                id: 14,
                senderId: 1,
                receiverId: 2,
                content: text,
                createdAt: '14:29',
                updatedAt: '14:29',
                status: '',
              },
            ],
          })
        }
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
