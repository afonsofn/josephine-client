import { View } from 'react-native'
import { Link } from 'expo-router'

import Text from '@/components/Text'

export default function ContactList() {
  return (
    // REFACT WHEN CREATE THE STYLE FOR IT
    <View
      style={{ alignItems: 'center', justifyContent: 'center', height: '100%' }}
    >
      <Text style={{ color: 'blue' }}>Hello</Text>

      <Link href="/ContactList">
        <Text style={{ color: 'red' }}>ContactList</Text>
      </Link>
    </View>
  )
}
