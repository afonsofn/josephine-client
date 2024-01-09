import { StyleSheet, View } from 'react-native'

import Text from '@/components/Text'

import { BlurView } from 'expo-blur'

export default function TypingIndicator({
  whoIsTyping,
}: {
  whoIsTyping: string
}) {
  if (!whoIsTyping) return null

  return (
    <View style={styles.container}>
      <BlurView intensity={2} style={styles.typingBlur}>
        <Text lowLight style={{ fontSize: 12 }}>
          {whoIsTyping}
        </Text>
      </BlurView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    top: '97%',
    height: 30,
  },
  typingBlur: {
    borderRadius: 14,
    overflow: 'hidden',
    paddingVertical: 5,
    paddingHorizontal: 12,
    alignSelf: 'center',
  },
})
