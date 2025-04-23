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

interface NotificationProps {
  title: string
  onClose?: () => void
  onPress?: () => void
}

export function Notification({ title, onClose, onPress }: NotificationProps) {
  return (
    <Box position="absolute" top={0} left={0} right={0}>
      <Pressable onPress={onPress}>
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
                {title}
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
