import { Text as DefaultText, StyleProp, ViewStyle } from 'react-native'
import { ReactNode } from 'react'
import { ChatMessage } from './globalTypes'

export interface ChatBoxProps {
  chatName: string
  lastMessage: string
  lastMessageTime: string
  isChatOnline?: boolean
  chatImage?: string
  chatId: number
}

export interface TokyoButtonProps {
  title: string
  subtitle: string
  Icon: React.ElementType<unknown>
  onPress: () => void
}

export interface NeonBarsProps {
  rightSide?: boolean
}

export interface MainGradientBgProps {
  children: ReactNode
}

export interface ChatGradientBgProps {
  children: ReactNode
  chatName: string | undefined
  isChatOnline: boolean
}

export interface ChatMessageProps {
  message: ChatMessage
}

export interface NeonStripProps {
  onPress: () => void
  style?: StyleProp<ViewStyle>
}

export interface NeoTextFieldProps {
  onPress: () => void
  onChangeText: (text: string) => void
  style?: StyleProp<ViewStyle>
}

export interface TokyoImageButtonProps {
  onPress: () => void
  imageUrl: string
  imageAlt?: string
}

export type TextProps = {
  accentColor?: boolean
  tokyo?: boolean
  lowLight?: boolean
  highLight?: boolean
  terminalStyle?: boolean
  terminalStyleSecondary?: boolean
} & DefaultText['props']
