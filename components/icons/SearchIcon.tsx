import { View } from 'react-native'
import Svg, { Rect } from 'react-native-svg'

import { sharedStyles } from '@/utils'

export default function SearchIcon() {
  return (
    <View style={sharedStyles.iconContainer}>
      <Svg width={26.5} height={19.5} viewBox="10 10 16 19" fill="none">
        <Rect
          x="11"
          y="23.69"
          width="18.51"
          height="4.109"
          rx="2.0545"
          transform="rotate(-45 11 23.69)"
          fill="#AFF5F3"
        />
        <Rect
          x="34.19"
          y="26.57"
          width="18.51"
          height="4.109"
          rx="2.0545"
          transform="rotate(-135 34.19 26.57)"
          fill="#AFF5F3"
        />
        <Rect
          x="37.31"
          y="15.47"
          width="18.51"
          height="4.109"
          rx="2.0545"
          transform="rotate(135 37.31 15.47)"
          fill="#AFF5F3"
        />
        <Rect
          x="14.17"
          y="12.51"
          width="18.51"
          height="4.109"
          rx="2.0545"
          transform="rotate(45 14.17 12.51)"
          fill="#AFF5F3"
        />
      </Svg>
    </View>
  )
}
