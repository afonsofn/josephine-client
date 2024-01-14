import { Animated, StyleSheet, View } from 'react-native'
import { useEffect, useRef } from 'react'

import Text from '@/components/Text'

import { ChatMessageBoxProps } from '@/types/propTypes'
import { UserInfo } from '@/types/globalTypes'
import { useSelector } from 'react-redux'
import { UserState } from '@/store/slices/userSlice'

export default function ChatMessageBox({ message }: ChatMessageBoxProps) {
  const user: UserInfo | null = useSelector(
    (state: UserState) => state?.userState.user,
  )

  function formatTime(dateTimeString: string) {
    const date = new Date(dateTimeString)
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')

    return `${hours}:${minutes}`
  }

  const isSentByUser = () => user?.id === message.senderId

  const slideAnim = useRef(
    new Animated.Value(isSentByUser() ? -20 : 20),
  ).current

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true,
    }).start()
  }, [slideAnim])

  return (
    <Animated.View
      style={{
        ...styles.linearGradient,
        alignSelf: isSentByUser() ? 'flex-end' : 'flex-start',
        transform: [{ translateX: slideAnim }],
      }}
    >
      <View>
        <Text
          terminalStyle={isSentByUser()}
          terminalStyleSecondary={!isSentByUser()}
          style={styles.messageContent}
        >
          {message.content}
        </Text>

        <View style={{ alignSelf: 'flex-end' }}>
          <Text
            style={{ fontSize: 8 }}
            highLight={isSentByUser()}
            lowLight={!isSentByUser()}
          >
            {formatTime(message.createdAt)} 読む
          </Text>
        </View>
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  linearGradient: {
    paddingHorizontal: 6,
    paddingVertical: 6,
    maxWidth: '90%',
  },
  messageContent: {
    paddingLeft: 4,
    marginLeft: -4,
  },
})
