import { OneSignal } from 'react-native-onesignal'

export function tagExerciseWeekHistoryUpdate(itemsCount: string) {
  OneSignal.User.addTag('exercises_in_the_same_week_count', itemsCount)
}
