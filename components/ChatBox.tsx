import { StyleSheet, TouchableWithoutFeedback, View, Image } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { router } from 'expo-router'

import Text from '@/components/Text'

import { colors } from '@/utils'
import { ChatBoxProps } from '@/types/propTypes'

export default function ChatBox({
  chatName,
  lastMessage,
  lastMessageTime,
  isChatOnline,
  chatImage,
  chatId,
}: ChatBoxProps) {
  return (
    <TouchableWithoutFeedback
      onPress={() => router.push(`/ChatRoom/${chatId}`)}
    >
      <View>
        <LinearGradient
          colors={colors.chatBoxBgGradient}
          start={{ x: 0.17, y: -0.6 }}
          end={{ x: 0.1, y: 0.5 }}
          style={styles.chatBox}
        >
          {chatImage ? (
            <View style={styles.contactPhoto}>
              <Image
                alt={`${chatName}-chat-image`}
                source={{ uri: chatImage }}
                style={styles.contactPhoto}
              />

              <LinearGradient
                colors={colors.chatBoxImageGradient}
                start={{ x: 1, y: -0.8 }}
                end={{ x: 0, y: 1.2 }}
                style={styles.chatBoxImageOverlay}
              ></LinearGradient>
            </View>
          ) : (
            <LinearGradient
              colors={colors.chatBoxEmptyImageGradient}
              start={{ x: 1, y: -0.8 }}
              end={{ x: 0, y: 1.2 }}
              style={styles.contactPhoto}
            ></LinearGradient>
          )}

          <View style={styles.contactContainer}>
            <View style={styles.contactNameAndMessage}>
              <Text>/{chatName}</Text>

              <Text
                lowLight
                numberOfLines={2}
                ellipsizeMode="tail"
                style={{ fontSize: 12 }}
              >
                {lastMessage}
              </Text>
            </View>

            <Text highLight={isChatOnline} lowLight={!isChatOnline}>
              {lastMessageTime} 読む
            </Text>
          </View>
        </LinearGradient>

        <View
          style={[
            styles.bottomLine,
            isChatOnline ? styles.bottomOnLine : styles.bottomOffLine,
          ]}
        ></View>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  chatBox: {
    paddingHorizontal: 14,
    paddingVertical: 16,
    borderRadius: 12,
    height: 82,
    flexDirection: 'row',
    gap: 12,
  },
  contactPhoto: {
    borderRadius: 12,
    height: 52,
    width: 52,
    resizeMode: 'cover',
  },
  contactContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 14,
  },
  contactNameAndMessage: {
    flex: 1,
    justifyContent: 'space-between',
  },
  bottomLine: {
    height: 1,
    borderRadius: 100,
    marginLeft: '60%',
    marginRight: 16,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 7.5,
    shadowOpacity: 1,
  },
  bottomOffLine: {
    backgroundColor: colors.lowLight,
    shadowColor: colors.lowLightShadowForElements,
  },
  bottomOnLine: {
    backgroundColor: colors.highLight,
    shadowColor: colors.highLightShadowForElements,
  },
  chatBoxImageOverlay: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 12,
  },
})
