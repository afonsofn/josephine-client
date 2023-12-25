import { Text as DefaultText, StyleSheet } from 'react-native'
import { useMemo } from 'react'
import { colors } from '@/utils'
import { TextProps } from '@/types/propTypes'

export default function Text({
  tokyo,
  lowLight,
  highLight,
  terminalStyle,
  terminalStyleSecondary,
  accentColor,
  style,
  ...otherProps
}: TextProps) {
  const textType = useMemo(() => {
    const styleMap = {
      tokyo: tokyo && defaultStyles.tokyoText,
      lowLight: lowLight && defaultStyles.lowLightText,
      highLight: highLight && defaultStyles.highLightText,
      terminalStyle: terminalStyle && defaultStyles.terminalStyle,
      terminalStyleSecondary:
        terminalStyleSecondary && defaultStyles.terminalStyleSecondary,
      accentColor: accentColor && { color: colors.primaryForElements },
    }

    return (
      styleMap.tokyo ||
      styleMap.lowLight ||
      styleMap.highLight ||
      styleMap.terminalStyle ||
      styleMap.terminalStyleSecondary ||
      styleMap.accentColor || { color: colors.primaryForText }
    )
  }, [
    tokyo,
    lowLight,
    highLight,
    terminalStyle,
    terminalStyleSecondary,
    accentColor,
  ])

  // ISSO É UM BUG, MAS FICOU MT BONITO
  // const textType = useMemo(() => {
  //   const styleMap = {
  //     tokyo: defaultStyles.tokyoText,
  //     lowLight: defaultStyles.lowLightText,
  //     highLight: defaultStyles.highLightText,
  //     accentColor: { color: colors.primaryForElements }
  //   };

  //   return styleMap.tokyo || styleMap.lowLight || styleMap.highLight || styleMap.accentColor || { color: colors.primaryForText };
  // }, [tokyo, lowLight, highLight, accentColor]);

  return (
    <DefaultText
      style={[defaultStyles.defaultText, textType, style]}
      {...otherProps}
    />
  )
}

const defaultStyles = StyleSheet.create({
  defaultText: {
    textShadowColor: colors.primaryShadow,
    fontSize: 16,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 7.5,
    fontWeight: '700',
    fontFamily: 'Courier New',
    padding: 6,
    margin: -6,
  },
  tokyoText: {
    color: colors.primaryForElements,
    fontSize: 12,
    fontWeight: '400',
    marginTop: -4,
  },
  lowLightText: {
    color: colors.lowLight,
    textShadowColor: colors.lowLightShadowForText,
    fontSize: 10,
  },
  highLightText: {
    color: colors.highLight,
    textShadowColor: colors.highLightShadowForText,
    fontSize: 10,
  },
  terminalStyle: {
    color: colors.primaryForText,
    fontFamily: 'SourceCodePro',
    fontSize: 14,
    flexShrink: 1,
    letterSpacing: -1,
  },
  terminalStyleSecondary: {
    color: '#7EB6FF',
    textShadowColor: colors.primaryShadow,
    fontFamily: 'SourceCodePro',
    fontSize: 14,
    flexShrink: 1,
    letterSpacing: -1,
  },
})
