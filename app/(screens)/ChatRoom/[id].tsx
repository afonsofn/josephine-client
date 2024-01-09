import { StyleSheet, View, FlatList, Keyboard } from 'react-native'
import { useCallback, useEffect, useRef, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { io } from 'socket.io-client'

import TokyoImageButton from '@/components/TokyoImageButton'
import MainGradientBg from '@/components/MainGradientBg'
import ChatGradientBg from '@/components/ChatGradientBg'
import NeoTextField from '@/components/NeoTextField'
import ChatMessageBox from '@/components/ChatMessageBox'
import NeonStrip from '@/components/NeonStrip'

import { ChatMessage, MessageStatus, UserInfo } from '@/types/globalTypes'
import { useSelector } from 'react-redux'
import { getChatInfo } from '@/api'
import socket from '@/socket/index'
import useSocketListener from '@/utils/useSocketListener'
import { API_PORT } from '@/utils/constants'
import TypingIndicator from '@/components/TypingIndicator'
import { UserState } from '@/store/slices/userSlice'

export default function ChatRoom() {
  const { id } = useLocalSearchParams()

  const [chatInfo, setChatInfo] = useState<UserInfo | null>(null)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [whoIsTyping, setWhoIsTyping] = useState('')
  const [textMessage, setTextMessage] = useState('')

  const flatListRef = useRef<FlatList>(null)
  const typingTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  const user: UserInfo | null = useSelector(
    (state: UserState) => state?.userState.user,
  )

  const localSocket = io(API_PORT)

  const handleGetAllMessages = useCallback(
    (allMessages: ChatMessage[]) => {
      setChatMessages(allMessages)

      const lastMessage = allMessages.at(-1)

      if (
        lastMessage?.senderId === user?.id ||
        lastMessage?.status === MessageStatus.READED
      )
        return

      socket.emit('markMessagesAsReaded', {
        userId: user?.id,
        contactId: chatInfo?.id,
      })
    },
    [chatInfo?.id, user?.id],
  )

  const fetchChatInfo = useCallback(async () => {
    try {
      const chatInfoResponse = await getChatInfo(Number(id))

      console.log(chatInfoResponse)

      setChatInfo(chatInfoResponse)

      socket.emit('getAllMessages', {}, handleGetAllMessages)
    } catch (error) {
      console.error('Erro capturado', error)
    }
  }, [handleGetAllMessages, id])

  const sendMessage = useCallback(
    () =>
      socket.emit(
        'sendMessage',
        {
          content: textMessage,
          senderId: user?.id,
          receiverId: chatInfo?.id,
          // TODO PARAMETRIZAR ISSO CORRETAMENTE
          contactId: 1,
        },
        () => setTextMessage(''),
      ),
    [chatInfo?.id, textMessage, user?.id],
  )

  const scrollToEnd = useCallback(
    (delayed = false) =>
      setTimeout(() => flatListRef.current?.scrollToEnd(), delayed ? 100 : 0),
    [],
  )

  const updateTypingState = (isTyping: boolean) => {
    socket.emit('typing', { userId: user?.id, name: user?.firstName, isTyping })
    setIsTyping(isTyping)
  }

  const handleTextAndTyping = (text: string) => {
    setTextMessage(text)

    if (typingTimeout.current) clearTimeout(typingTimeout.current)

    if (!isTyping) updateTypingState(true)

    typingTimeout.current = setTimeout(() => updateTypingState(false), 1500)
  }

  const handleMessageEvent = useCallback(
    (message: ChatMessage) => {
      setChatMessages((currentMessages) => [...currentMessages, message])

      scrollToEnd(true)
    },
    [setChatMessages, scrollToEnd],
  )

  const handleTypingEvent = ({
    userId,
    name,
    isTyping,
  }: {
    userId: number
    name: string
    isTyping: boolean
  }) => {
    if (userId === user?.id) return

    if (isTyping) setWhoIsTyping(`${name} is typing...`)
    else setWhoIsTyping('')
  }

  const setKeyboardListener = useCallback(() => {
    return Keyboard.addListener('keyboardDidShow', () => scrollToEnd())
  }, [scrollToEnd])

  const setChatRoomId = () => {
    socket.emit('SetChatRoomId', {
      userId: user?.id,
      socketId: localSocket.id,
    })
  }

  useSocketListener('typing', handleTypingEvent)
  useSocketListener('message', handleMessageEvent, null, {
    shouldTurnOff: false,
  })
  useSocketListener('connect', setChatRoomId, localSocket, {
    useLocalSocket: true,
  })

  useEffect(() => {
    fetchChatInfo()

    const keyboardDidShowListener = setKeyboardListener()

    return () => {
      keyboardDidShowListener.remove()
    }
  }, [fetchChatInfo, setKeyboardListener])

  return (
    <MainGradientBg>
      <View style={styles.header}>
        <NeonStrip
          onPress={() => router.push('/ContactList')}
          style={{ alignSelf: 'center' }}
        />

        <TokyoImageButton onPress={() => ''} imageUrl={chatInfo?.imageUrl} />
      </View>

      <ChatGradientBg
        chatStatus={chatInfo?.status}
        chatName={chatInfo?.firstName + ' ' + chatInfo?.lastName}
      >
        <FlatList
          ref={flatListRef}
          data={chatMessages}
          renderItem={({ item }) => <ChatMessageBox message={item} />}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.messagesList}
          onContentSizeChange={() => scrollToEnd()}
          showsVerticalScrollIndicator={false}
        />

        <TypingIndicator whoIsTyping={whoIsTyping} />
      </ChatGradientBg>

      <NeoTextField
        onChangeText={handleTextAndTyping}
        onPress={sendMessage}
        value={textMessage}
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
