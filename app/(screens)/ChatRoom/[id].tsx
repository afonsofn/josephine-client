import { StyleSheet, View, FlatList } from 'react-native'
import { useCallback, useEffect, useRef, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'

import TokyoImageButton from '@/components/TokyoImageButton'
import MainGradientBg from '@/components/MainGradientBg'
import ChatGradientBg from '@/components/ChatGradientBg'
import NeoTextField from '@/components/NeoTextField'
import ChatMessageBox from '@/components/ChatMessageBox'
import NeonStrip from '@/components/NeonStrip'
import Text from '@/components/Text'

import {
  ChatInfo,
  ChatMessage,
  ChatStatus,
  MessageStatus,
  UserInfo,
} from '@/types/globalTypes'
import { useSelector } from 'react-redux'
import { getChatInfo } from '@/api'
import useSocket from '@/socket/index'
import useSocketListener from '@/utils/useSocketListener'
import TypingIndicator from '@/components/TypingIndicator'
import { UserState } from '@/store/slices/userSlice'

export default function ChatRoom() {
  const { id } = useLocalSearchParams()

  const [chatInfo, setChatInfo] = useState<ChatInfo | null>(null)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [whoIsTyping, setWhoIsTyping] = useState('')
  const [textMessage, setTextMessage] = useState('')

  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [hasMoreMessages, setHasMoreMessages] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 20

  const flatListRef = useRef<FlatList>(null)
  const typingTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  const user: UserInfo | null = useSelector(
    (state: UserState) => state?.userState.user,
  )

  const socket = useSocket()

  const handleGetAllMessages = useCallback(
    (allMessages: ChatMessage[]) => {
      setChatMessages(allMessages)

      setHasMoreMessages(allMessages.length === pageSize)

      const lastMessage = allMessages.at(-1)

      if (
        lastMessage?.senderId === user?.id ||
        lastMessage?.status === MessageStatus.READED
      )
        return

      socket?.emit('markAllMessagesAsReaded', {
        receiverId: user?.id,
        senderId: chatInfo?.id,
      })
    },
    [chatInfo?.id, user?.id, socket],
  )

  const getAllMessages = useCallback(async () => {
    socket?.emit(
      'getAllMessages',
      {
        senderId: user?.id,
        receiverId: chatInfo?.id,
        page: currentPage,
        pageSize,
      },
      handleGetAllMessages,
    )
  }, [chatInfo?.id, handleGetAllMessages, socket, user?.id, currentPage])

  const fetchChatInfo = useCallback(async () => {
    try {
      const chatInfoResponse = await getChatInfo(id as string)

      setChatInfo(chatInfoResponse)

      getAllMessages()

      socket?.emit('SetChatRoomId', {
        userId: user?.id,
        chatId: chatInfo?.id,
      })
    } catch (error) {
      console.error('Erro capturado', error)
    }
  }, [id, getAllMessages, socket, user?.id, chatInfo?.id])

  const sendMessage = useCallback(
    () =>
      socket?.emit(
        'sendMessage',
        {
          content: textMessage,
          senderId: user?.id,
          receiverId: chatInfo?.id,
          contactId: chatInfo?.contactId,
        },
        () => setTextMessage(''),
      ),
    [socket, textMessage, user?.id, chatInfo?.id, chatInfo?.contactId],
  )

  const updateTypingState = (isTyping: boolean) => {
    socket?.emit('typing', {
      receiverId: chatInfo?.id,
      name: user?.firstName,
      isTyping,
    })
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
    },
    [setChatMessages],
  )

  const handleTypingEvent = ({
    name,
    isTyping,
  }: {
    name: string
    isTyping: boolean
  }) => {
    if (isTyping) setWhoIsTyping(`${name} is typing...`)
    else setWhoIsTyping('')
  }

  const handleChatStatusUpdate = (chatStatus: boolean) => {
    if (!chatInfo) return

    setChatInfo({
      ...chatInfo,
      status: chatStatus ? ChatStatus.ONLINE : ChatStatus.OFFLINE,
    })
  }

  const onEndReached = async () => {
    if (isLoadingMore || !hasMoreMessages) return

    setCurrentPage(currentPage + 1)
    setIsLoadingMore(true)

    socket?.emit(
      'getAllMessages',
      {
        senderId: user?.id,
        receiverId: chatInfo?.id,
        page: currentPage,
        pageSize,
      },
      (allMessages: ChatMessage[]) => {
        handleGetAllMessages(allMessages)
        setIsLoadingMore(false)
      },
    )
  }

  useSocketListener('typing', handleTypingEvent)
  useSocketListener('chatStatusUpdate', handleChatStatusUpdate, [chatInfo])
  useSocketListener('message', handleMessageEvent, [], false)

  useEffect(() => {
    fetchChatInfo()

    return () => {
      socket?.emit('SetChatRoomId', {
        userId: user?.id.toString(),
        chatId: null,
      })
    }
  }, [fetchChatInfo, socket, user?.id])

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
        {chatMessages.length ? (
          <FlatList
            ref={flatListRef}
            data={chatMessages.slice().reverse()}
            renderItem={({ item }) => <ChatMessageBox message={item} />}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.messagesList}
            showsVerticalScrollIndicator={false}
            onEndReached={onEndReached}
            onEndReachedThreshold={0.5}
            inverted
          />
        ) : (
          <View
            style={{
              position: 'absolute',
              top: '80%',
              bottom: 0,
              left: 0,
              right: 0,
              justifyContent: 'center',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <Text lowLight style={{ fontSize: 12 }}>
              まだ誰もここにはいない
            </Text>
            <Text lowLight style={{ fontSize: 12 }}>
              No messages yet
            </Text>
          </View>
        )}

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
