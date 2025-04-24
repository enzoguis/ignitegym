import { OneSignal } from 'react-native-onesignal'

export function tagExerciseWeekHistoryUpdate(itemsCount: string) {
  OneSignal.User.addTag('exercises_in_the_same_week_count', itemsCount)
}

export function tagDoesUserHaveAccount(hasAccount: 'yes' | 'no') {
  OneSignal.User.addTag('does_user_have_account', hasAccount)
}
