import { StyleSheet, View, TextInput } from 'react-native'
import { useEffect, useState } from 'react'

import NeonStrip from '@/components/NeonStrip'

import colors from '@/utils/colors'
import { NeoTextFieldProps } from '@/types/propTypes'

export default function NeoTextField({
  onChangeText,
  onPress,
  value,
}: NeoTextFieldProps) {
  const [text, setText] = useState(value || '')

  useEffect(() => {
    setText(value)
  }, [value])

  const handleInputChange = (text: string) => {
    setText(text)
    onChangeText(text)
  }

  return (
    <View>
      <TextInput
        style={styles.neoTextField}
        onChangeText={handleInputChange}
        value={text}
        multiline={true}
        numberOfLines={2}
      />

      <NeonStrip
        onPress={onPress}
        style={{ ...StyleSheet.absoluteFillObject, ...styles.neonStrip }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  neoTextField: {
    borderRadius: 44,
    lineHeight: 18,
    minHeight: 48,
    maxHeight: 68,
    paddingTop: 14,
    paddingBottom: 14,
    paddingLeft: 22,
    paddingRight: 68,
    overflow: 'hidden',
    backgroundColor: colors.textFieldBg,
    color: colors.primaryForElements,
    textShadowColor: colors.primaryShadow,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 7.5,
    fontFamily: 'SourceCodePro',
    letterSpacing: -1,
  },
  neonStrip: {
    marginTop: -4,
    marginLeft: -61,
    top: '50%',
    left: '100%',
  },
})
