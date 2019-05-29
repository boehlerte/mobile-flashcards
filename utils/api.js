import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'

const DECKS_STORAGE_KEY = 'UdaciCards:decks';
const NOTFICATION_KEY = 'UdaciCards:notifications'

export function getDecks() {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY).then(JSON.parse)
}

export function getDeck(deckId) {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then((results) => {
            return results[deckId];
        })
}

function createNewDeck(deckTitle) {
    return {
        title: deckTitle,
        questions: []
    }
}

export function saveDeckTitle(deckTitle) {
    const newDeck = createNewDeck(deckTitle)
    AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
        [deckTitle]: newDeck
    }))
    return newDeck
}

// card = { question: '', answer: '' }
export function addCardToDeck(card, deckId) {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then((results) => {
            const data = JSON.parse(results)
            data[deckId].questions = [...data[deckId].questions, card]
            AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
        })
}

export function deleteDeckFromStorage(deckId) {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then((results) => {
            const data = JSON.parse(results)
            for (const deckTitle in data) {
                if (deckTitle === deckId) {
                    delete data[deckTitle]
                }
            }
            AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
        })
}

export function clearLocalNotification () {
    return AsyncStorage.removeItem(NOTFICATION_KEY)
      .then(Notifications.cancelAllScheduledNotificationsAsync)
  }

function createNotification () {
    return {
      title: 'Study Time',
      body: "👋 don't forget to get some studying in today!",
      ios: {
        sound: true,
      },
    }
  }

export function setLocalNotification () {
    AsyncStorage.getItem(NOTFICATION_KEY)
      .then(JSON.parse)
      .then((data) => {
        if (data === null) {
          Permissions.askAsync(Permissions.NOTIFICATIONS)
            .then(({ status }) => {
              if (status === 'granted') {
                Notifications.cancelAllScheduledNotificationsAsync()
                let tomorrow = new Date()
                tomorrow.setDate(tomorrow.getDate() + 1)
                tomorrow.setHours(20)
                tomorrow.setMinutes(0)
  
                Notifications.scheduleLocalNotificationAsync(
                  createNotification(),
                  {
                    time: tomorrow,
                    repeat: 'day',
                  }
                )
  
                AsyncStorage.setItem(NOTFICATION_KEY, JSON.stringify(true))
              }
            })
        }
      })
  }
