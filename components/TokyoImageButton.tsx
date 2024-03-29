import { Image, StyleSheet, TouchableWithoutFeedback, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import Text from '@/components/Text'
import { TokyoImageButtonProps } from '@/types/propTypes'
import colors from '@/utils/colors'

export default function TokyoImageButton({
  onPress,
  imageUrl,
  imageAlt = '',
}: TokyoImageButtonProps) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        {imageUrl ? (
          <Image
            alt={imageAlt}
            source={{ uri: imageUrl }}
            style={styles.buttonImage}
          />
        ) : (
          <LinearGradient
            colors={colors.chatBoxEmptyImageGradient}
            start={{ x: 1, y: -2 }}
            end={{ x: 0, y: 2 }}
            style={styles.buttonImage}
          ></LinearGradient>
        )}

        <Text style={{ lineHeight: 16, paddingBottom: 0 }}>私のエリア</Text>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '10%',
    gap: 3,
  },
  buttonImage: {
    borderBottomLeftRadius: 8,
    borderTopLeftRadius: 8,
    height: '100%',
    width: 34,
    resizeMode: 'cover',
  },
})
