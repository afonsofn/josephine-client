import {
  StyleSheet,
  View,
  SafeAreaView,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

import { colors } from '@/utils'
import { MainGradientBgProps } from '@/types/propTypes'

export default function MainGradientBg({ children }: MainGradientBgProps) {
  return (
    // <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <LinearGradient
        colors={colors.contactListBgGradient}
        start={{ x: 0.4, y: -0.05 }}
        end={{ x: 0.1, y: 0.5 }}
      >
        <SafeAreaView>
          <View style={styles.container}>{children}</View>
        </SafeAreaView>
      </LinearGradient>
    </KeyboardAvoidingView>
    // </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingTop: 24,
    paddingBottom: 12,
    paddingHorizontal: 24,
  },
})
