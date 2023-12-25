import { StyleSheet, View } from 'react-native'

import Text from '@/components/Text'

import { ChatMessageBoxProps } from '@/types/propTypes'

export default function ChatMessageBox({ message }: ChatMessageBoxProps) {
  // REFACT
  const user = {
    userId: 1,
  }

  function formatTime(dateTimeString: string) {
    const date = new Date(dateTimeString)
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')

    return `${hours}:${minutes}`
  }

  const isSentByUser = () => user.userId === message.senderId

  return (
    <View
      style={[
        styles.linearGradient,
        { alignSelf: isSentByUser() ? 'flex-end' : 'flex-start' },
      ]}
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
          <Text highLight={isSentByUser()} lowLight={!isSentByUser()}>
            {formatTime(message.createdAt)} 読む
          </Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  linearGradient: {
    paddingHorizontal: 6,
    paddingVertical: 6,
    maxWidth: '90%',
  },
  messageContent: {
    marginBottom: 2,
    paddingLeft: 4,
    marginLeft: -4,
  },
})