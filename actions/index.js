import { saveDeckTitle, addCardToDeck, deleteDeckFromStorage, getDecks } from '../utils/api'

export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const ADD_CARD = 'ADD_CARD'
export const DELETE_DECK = 'DELETE_DECK'

export function receiveDecks (decks) {
    return {
        type: RECEIVE_DECKS,
        decks,
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
    return (dispatch) => {
        addCardToDeck(card, deckId)
        dispatch(addCard(card, deckId))
    }
}

function deleteDeck (deckId) {
    return {
        type: DELETE_DECK,
        deckId
    }
}

export function handleDeleteDeck (deckId) {
    return(dispatch) => {
        deleteDeckFromStorage(deckId)
        dispatch(deleteDeck(deckId))
    }
}

