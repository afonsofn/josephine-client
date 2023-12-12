import { useEffect } from 'react'
import { SplashScreen, Stack } from 'expo-router'
import { useFonts } from 'expo-font'
import FontAwesome from '@expo/vector-icons/FontAwesome'

export { ErrorBoundary } from 'expo-router'
// eslint-disable-next-line camelcase
export const unstable_settings = { initialRouteName: 'index' }

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SourceCodePro: require('../assets/fonts/SourceCodePro.ttf'),
    ...FontAwesome.font,
  })

  useEffect(() => {
    if (error) throw error
  }, [error])

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync()
  }, [loaded])

  if (!loaded) return null

  return <RootLayoutNav />
}

function RootLayoutNav() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="(screens)/ContactList"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="(screens)/ChatRoom/[id]"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="(screens)/ConfigPanel"
        options={{ headerShown: true }}
      />
    </Stack>
  )
}
