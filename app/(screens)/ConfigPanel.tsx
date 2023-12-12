import { StyleSheet } from 'react-native'

import Text from '@/components/Text'

export default function ConfigPanel() {
  return <Text style={styles.container}>ConfigPanel</Text>
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingTop: 24,
    paddingBottom: 12,
    paddingHorizontal: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 48,
  },
  footer: {
    alignItems: 'flex-end',
    gap: 12,
  },
})
