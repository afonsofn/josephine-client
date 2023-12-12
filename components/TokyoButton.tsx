import { View, TouchableOpacity } from 'react-native'
import Text from '@/components/Text'
import { TokyoButtonProps } from '@/types/propTypes'

export default function TokyoButton({
  title,
  subtitle,
  Icon,
  onPress,
}: TokyoButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}
    >
      <Icon />

      <View>
        <Text accentColor>{title}</Text>
        <Text tokyo>{subtitle}</Text>
      </View>
    </TouchableOpacity>
  )
}
