import { Image, StyleSheet, TouchableWithoutFeedback, View } from 'react-native'
import Text from '@/components/Text'
import { TokyoImageButtonProps } from '@/types/propTypes'

export default function TokyoImageButton({
  onPress,
  imageUrl,
  imageAlt = '',
}: TokyoImageButtonProps) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <Image
          alt={imageAlt}
          source={{ uri: imageUrl }}
          style={styles.buttonImage}
        />

        <Text style={{ lineHeight: 16 }}>私のエリア</Text>
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
