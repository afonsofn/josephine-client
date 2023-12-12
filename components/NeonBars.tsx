import { StyleSheet, View } from 'react-native'

import { colors } from '@/utils'
import { NeonBarsProps } from '@/types/propTypes'

export default function NeonBars({ rightSide = false }: NeonBarsProps) {
  return (
    <View
      style={{
        width: '100%',
        alignItems: rightSide ? 'flex-end' : 'flex-start',
      }}
    >
      <View style={{ ...styles.neonLine, width: '53%' }} />
      <View style={{ ...styles.neonLine, width: '68%' }} />
    </View>
  )
}

const styles = StyleSheet.create({
  neonLine: {
    backgroundColor: colors.primaryForElements,
    shadowColor: colors.primaryShadow,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 7.5,
    shadowOpacity: 1,
    borderRadius: 100,
    marginTop: 2,
    height: 2,
  },
})
