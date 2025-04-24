import { Loading } from '@components/Loading'
import { Notification } from '@components/Notification'
import { Box } from '@gluestack-ui/themed'
import { useAuth } from '@hooks/useAuth'
import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import {
  NotificationWillDisplayEvent,
  OneSignal,
  OSNotification,
} from 'react-native-onesignal'
import { gluestackUIConfig } from '../../config/gluestack-ui.config'
import { tagDoesUserHaveAccount } from '../notifications/notificationTags'
import { AppRoutes } from './app.routes'
import { AuthRoutes } from './auth.routes'

const linking = {
  prefixes: ['ignitegym://', 'com.ignitegym://'],
  config: {
    screens: {
      exercise: {
        path: 'exercise/:id',
        parse: { id: (id: string) => id },
      },
    },
  },
}

export function Routes() {
  const [notification, setNotification] = useState<OSNotification>()
  const { user, isLoadingUserStorageData } = useAuth()

  const theme = DefaultTheme
  theme.colors.background = gluestackUIConfig.tokens.colors.gray700

  useEffect(() => {
    const handleNotification = (event: NotificationWillDisplayEvent): void => {
      event.preventDefault()
      const response = event.getNotification()
      setNotification(response)
    }

    OneSignal.Notifications.addEventListener(
      'foregroundWillDisplay',
      handleNotification
    )

    return () => {
      OneSignal.Notifications.removeEventListener(
        'foregroundWillDisplay',
        handleNotification
      )
    }
  }, [])

  if (isLoadingUserStorageData) {
    return <Loading />
  }

  if (user.id) {
    tagDoesUserHaveAccount('yes')
  }

  return (
    <Box flex={1} bg="$gray700">
      <NavigationContainer theme={theme} linking={linking}>
        {user.id ? <AppRoutes /> : <AuthRoutes />}
        {notification?.title && (
          <Notification
            data={notification}
            onClose={() => setNotification(undefined)}
          />
        )}
      </NavigationContainer>
    </Box>
  )
}
