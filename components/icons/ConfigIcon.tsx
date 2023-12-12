import { View } from 'react-native'
import Svg, { Rect } from 'react-native-svg'

import { sharedStyles } from '@/utils'

export default function CustomIcon() {
  return (
    <View style={sharedStyles.iconContainer}>
      <Svg width={28.8} height={22.8} viewBox="10 10 18 18" fill="none">
        <Rect x="11" y="11" width="7" height="7" rx="3.5" fill="#AFF5F3" />
        <Rect x="25" y="11" width="7" height="7" rx="3.5" fill="#AFF5F3" />
        <Rect x="18" y="20" width="7" height="7" rx="3.5" fill="#AFF5F3" />
      </Svg>
    </View>
  )
}
