import { HistoryCard } from '@components/HistoryCard'
import { Loading } from '@components/Loading'
import { ScreenHeader } from '@components/ScreenHeader'
import { ToastMessage } from '@components/ToastMessage'
import { HistoryGroupByDayDTO } from '@dtos/HistoryGroupByDayDTO'
import { Heading, Text, useToast, VStack } from '@gluestack-ui/themed'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from '@routes/app.routes'
import { api } from '@services/api'
import { AppError } from '@utils/AppError'
import dayjs from 'dayjs'
import { useCallback, useState } from 'react'
import { SectionList } from 'react-native'
import { tagExerciseWeekHistoryUpdate } from '../notifications/notificationTags'

export function History() {
  const [isLoading, setIsLoading] = useState(true)
  const [exercises, setExercises] = useState<HistoryGroupByDayDTO[]>([])

  const toast = useToast()
  const navigation = useNavigation<AppNavigatorRoutesProps>()

  async function fetchHistory() {
    try {
      setIsLoading(true)
      const { data } = await api.get(`/history`)
      setExercises(data)

      navigation.navigate('history')
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : 'Não foi possível registrar o exercício.'

      toast.show({
        placement: 'top',
        render: ({ id }) => (
          <ToastMessage
            id={id}
            action="error"
            title={title}
            onClose={() => toast.close(id)}
          />
        ),
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function weeklySummary() {
    const today = dayjs()
    const actualWeekDay = today.day()

    if (actualWeekDay === 0) {
      const lastSevenDays: string[] = []

      for (let i = 0; i < 7; i++) {
        const day = today.subtract(i, 'day').format('DD.MM.YYYY')
        lastSevenDays.push(day)
      }

      const exercisesInTheSameWeek = exercises.filter((item) =>
        lastSevenDays.includes(item.title)
      )
      tagExerciseWeekHistoryUpdate(exercisesInTheSameWeek.length.toString())
    } else {
      tagExerciseWeekHistoryUpdate('0')
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchHistory()
      weeklySummary()
    }, [])
  )

  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de Exercícios" />

      {isLoading ? (
        <Loading />
      ) : (
        <SectionList
          sections={exercises}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <HistoryCard data={item} />}
          style={{ paddingHorizontal: 32 }}
          renderSectionHeader={({ section }) => (
            <Heading
              color="$gray200"
              fontSize="$md"
              mt="$10"
              mb="$3"
              fontFamily="$heading"
            >
              {section.title}
            </Heading>
          )}
          contentContainerStyle={
            exercises.length === 0 && { flex: 1, justifyContent: 'center' }
          }
          ListEmptyComponent={() => (
            <Text color="$gray100" textAlign="center">
              Não há exercícios registrados ainda.{'\n'} Vamos fazer exercícios
              hoje?
            </Text>
          )}
          showsVerticalScrollIndicator={false}
        />
      )}
    </VStack>
  )
}
