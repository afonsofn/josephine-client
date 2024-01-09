import { LayoutChangeEvent, StyleSheet, View } from 'react-native'
import { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { BlurView } from 'expo-blur'

import Text from '@/components/Text'

import { colors } from '@/utils'
import { ChatGradientBgProps } from '@/types/propTypes'
import { ChatStatus } from '@/types'

export default function ChatGradientBg({
  children,
  chatName,
  chatStatus = ChatStatus.OFFLINE,
}: ChatGradientBgProps) {
  const [chatNameWidth, setChatNameWidth] = useState(0)

  const CHAT_NAME_MARGIN = 4

  const getTwoFirstNames = (name?: string) => {
    if (!name) return '?'

    const splitedName = name.split(' ')

    if (splitedName.length === 1) return name.toUpperCase()

    return `${splitedName[0]} ${splitedName[1]}`.toUpperCase()
  }

  const handleOnLayoutText = ({ nativeEvent }: LayoutChangeEvent) => {
    const { width } = nativeEvent.layout

    setChatNameWidth(width + CHAT_NAME_MARGIN * 2)
  }

  const InnerBlurShadow = () => {
    return (
      <>
        <LinearGradient
          colors={colors.chatInnerShadow}
          start={{ x: 0.5, y: -1 }}
          end={{ x: 0.5, y: 1 }}
          style={{ ...styles.innerBlurShadow, height: 35 }}
        />

        <BlurView
          intensity={2}
          style={{ ...styles.innerBlurShadow, height: 20 }}
        ></BlurView>
      </>
    )
  }

  return (
    <View style={{ flex: 1 }}>
      {/* Chat bg */}
      <LinearGradient
        colors={
          chatStatus === ChatStatus.ONLINE
            ? colors.onlineChatBorderGradient
            : colors.offlineChatBorderGradient
        }
        start={{ x: 0.1, y: -0.05 }}
        end={{ x: 0.1, y: 0.5 }}
        style={styles.gradientBorder}
      >
        <LinearGradient
          colors={colors.chatBgGradient}
          start={{ x: 0.4, y: -0.14 }}
          end={{ x: 0.1, y: 0.75 }}
          style={styles.gradientBg}
        >
          {children}

          <InnerBlurShadow />
        </LinearGradient>
      </LinearGradient>

      {/* Chat name bg bar */}
      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          ...styles.nameBgBar,
          width: chatNameWidth,
        }}
      ></View>

      {/* Chat name */}
      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          ...styles.chatNameContainer,
        }}
      >
        <Text
          style={{
            ...styles.chatName,
            marginLeft: CHAT_NAME_MARGIN,
          }}
          onLayout={handleOnLayoutText}
          numberOfLines={1}
          ellipsizeMode="tail"
          accentColor={chatStatus === ChatStatus.ONLINE}
          lowLight={chatStatus === ChatStatus.OFFLINE}
        >
          {getTwoFirstNames(chatName)}
        </Text>
      </View>

      {/* Chat status */}
      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          ...styles.chatStatusContainer,
        }}
      >
        <View
          style={{
            ...styles.chatStatus,
            marginLeft: CHAT_NAME_MARGIN,
          }}
        >
          <View
            style={[
              styles.chatStatusIcon,
              chatStatus === ChatStatus.ONLINE
                ? styles.chatStatusIconOnline
                : styles.chatStatusIconOffline,
            ]}
          ></View>
          <Text
            style={{ fontSize: 10 }}
            accentColor={chatStatus === ChatStatus.ONLINE}
            lowLight={chatStatus === ChatStatus.OFFLINE}
          >
            {chatStatus === ChatStatus.ONLINE ? 'online' : 'offline'}
          </Text>
        </View>
      </View>

      {/* Chat japanese status */}
      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          ...styles.chatJapaneseStatus,
        }}
      >
        <Text
          style={{ fontSize: 10, padding: 6, margin: -6 }}
          accentColor={chatStatus === ChatStatus.ONLINE}
          lowLight={chatStatus === ChatStatus.OFFLINE}
        >
          オンライン
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  gradientBorder: {
    borderRadius: 44,
    padding: 1,
  },
  gradientBg: {
    borderRadius: 44,
    padding: 12,
    paddingTop: 0,
    height: '100%',
  },
  nameBgBar: {
    left: '13%',
    height: 1,
    backgroundColor: colors.turnedOffNeon,
  },
  chatNameContainer: {
    left: '13%',
    height: 30,
    top: -8,
  },
  chatStatusContainer: {
    left: '13%',
    height: 30,
    top: 10,
  },
  chatJapaneseStatus: {
    left: '70%',
    height: 30,
    top: 6,
  },
  chatName: {
    fontSize: 16,
    alignSelf: 'flex-start',
    maxWidth: 160,
  },
  chatStatus: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
  },
  chatStatusIcon: {
    height: 5,
    width: 5,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 3.5,
    shadowOpacity: 1,
    borderRadius: 100,
    marginTop: 3.5,
    marginHorizontal: 6,
  },
  chatStatusIconOnline: {
    shadowColor: colors.primaryShadowBrighter,
    backgroundColor: colors.primaryForElements,
  },
  chatStatusIconOffline: {
    shadowColor: colors.lowLight,
    backgroundColor: colors.lowLightShadowForText,
  },
  innerBlurShadow: {
    ...StyleSheet.absoluteFillObject,
    top: 0,
    left: 0,
    right: 0,
  },
})
