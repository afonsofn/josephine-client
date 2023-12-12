import { View } from 'react-native'
import Svg, { Rect } from 'react-native-svg'

import { sharedStyles } from '@/utils'

export default function NewChatIcon() {
  return (
    <View style={sharedStyles.iconContainer}>
      <Svg width={20.5} height={25} viewBox="10 10 12 21" fill="none">
        <Rect
          x="14.12"
          y="13.57"
          width="20"
          height="4.109"
          rx="2.0545"
          transform="rotate(45 14.12 13.57)"
          fill="#AFF5F3"
        />
        <Rect
          x="11"
          y="24.666"
          width="20"
          height="4.109"
          rx="2.0545"
          transform="rotate(-45 11 24.666)"
          fill="#AFF5F3"
        />
      </Svg>
    </View>
  )
}
