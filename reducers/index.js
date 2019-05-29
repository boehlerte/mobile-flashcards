import { RECEIVE_DECKS, ADD_DECK, ADD_CARD, DELETE_DECK } from '../actions'

function decks (state = {}, action) {
    switch (action.type) {
        case RECEIVE_DECKS :
            return {
                ...state,
                ...action.decks,
            }
        case ADD_DECK :
            return {
                ...state,
                [action.deck.title]: action.deck
            }
        case ADD_CARD :
            return {
                ...state,
                [action.deckId]: {
                    ...state[action.deckId],
                    questions: [...state[action.deckId].questions, action.card]
                }
            }
        case DELETE_DECK:
            const newState = Object.assign({}, state)
            for (const deckTitle in newState) {
                if (deckTitle === action.deckId) {
                    delete newState[deckTitle]
                }
            }
            return newState
        default :
            return state
    }
}

export default decks