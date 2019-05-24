import { AsyncStorage } from 'react-native'

const DECKS_STORAGE_KEY = 'UdaciCards:decks';

export function getDecks() {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY);
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
