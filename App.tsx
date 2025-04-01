import { Loading } from '@components/Loading'
import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from '@expo-google-fonts/roboto'
import { GluestackUIProvider, View } from '@gluestack-ui/themed'
import { AppRoutes } from '@routes/app.routes'
import { StatusBar } from 'react-native'
import { config } from './config/gluestack-ui.config'
import { Routes } from '@routes/index'

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_700Bold, Roboto_400Regular })
  return (
    <GluestackUIProvider config={config}>
      {fontsLoaded ? <Routes /> : <Loading />}
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
    </GluestackUIProvider>
  )
}
