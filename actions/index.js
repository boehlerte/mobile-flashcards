import { saveDeckTitle, addCardToDeck } from '../utils/api'

export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const ADD_CARD = 'ADD_CARD'

export function receiveDecks (decks) {
    return {
        type: RECEIVE_DECKS,
        entries,
    }
}

function addDeck (deck) {
    return {
        type: ADD_DECK,
        deck
    }
}

export function handleAddDeck (deckTitle) {
    return (dispatch) => {
        const newDeck = saveDeckTitle(deckTitle)
        dispatch(addDeck(newDeck))
    }
}

function addCard (card, deckId) {
    return {
        type: ADD_CARD,
        card,
        deckId
    }
}

export function handleAddCard (card, deckId) {
    console.log('card', card)
    console.log('deckId', deckId)
    return (dispatch) => {
        const newData = addCardToDeck(card, deckId)
        console.log(newData)
        dispatch(addCard(card, deckId))
    }
}

