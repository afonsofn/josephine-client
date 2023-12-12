import { StyleSheet, TouchableOpacity } from 'react-native'

import { colors } from '@/utils'
import { NeonStripProps } from '@/types/propTypes'

export default function NeonStrip({ onPress, style }: NeonStripProps) {
  return <TouchableOpacity onPress={onPress} style={[neonStrip, style]} />
}

const { neonStrip } = StyleSheet.create({
  neonStrip: {
    height: 8,
    width: 45,
    backgroundColor: colors.primaryForElements,
    shadowColor: colors.primaryShadow,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 7.5,
    shadowOpacity: 1,
    borderRadius: 100,
  },
})
