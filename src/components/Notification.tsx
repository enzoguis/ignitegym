import React from 'react'
import {
  Box,
  HStack,
  VStack,
  Text,
  Pressable,
  Icon,
  CloseIcon,
  Center,
} from '@gluestack-ui/themed'
import { Dumbbell } from 'lucide-react-native'
import { OSNotification } from 'react-native-onesignal'
import { openURL } from 'expo-linking'

interface NotificationProps {
  data: OSNotification
  onClose: () => void
}
type Props = {
  data: OSNotification
  onClose: () => void
}

type CustomOSNotification = {
  custom: any
}

type CustomUOSNotification = {
  u: string
}

export function Notification({ data, onClose }: NotificationProps) {
  function handleOnPress() {
    const { custom }: CustomOSNotification = JSON.parse(
      data.rawPayload.toString()
    )
    const { u: uri }: CustomUOSNotification = JSON.parse(custom.toString())

    if (uri) {
      openURL(uri)
      onClose()
    }
  }

  return (
    <Box position="absolute" top={0} left={0} right={0}>
      <Pressable onPress={handleOnPress}>
        <Box bg="#00B37E" borderRadius="$lg" p="$4" mx="$4" mt="$6">
          <HStack space="md" alignItems="center">
            <Center
              bg="rgba(255, 255, 255, 0.2)"
              w="$10"
              h="$10"
              borderRadius="$full"
            >
              <Icon as={Dumbbell} size="md" color="$white" />
            </Center>

            <VStack flex={1} space="xs">
              <Text color="$white" fontWeight="$bold" fontSize="$md">
                {data.title}
              </Text>
            </VStack>

            {onClose && (
              <Pressable onPress={onClose} p="$1">
                <Icon as={CloseIcon} size="sm" color="$white" />
              </Pressable>
            )}
          </HStack>
        </Box>
      </Pressable>
    </Box>
  )
}
