import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { receiveDecks } from '../actions';
import { getDecks } from '../utils/api';

class DeckListView extends Component {

    componentDidMount = () => {
        getDecks()
            .then((decks) => this.props.dispatch(receiveDecks(decks)))
    }

    toDeckView = (deckId) => {
        this.props.navigation.navigate(
            'DeckView',
            { deckId }
        )
    }

    render () {
        const { decks } = this.props
        const numDecks = Object.keys(decks).length;
        return (
            <View style={styles.container}>
                {numDecks > 0
                    ? <View>
                        {Object.keys(decks).map((deckId) => (
                            <TouchableOpacity key={deckId} onPress={() => this.toDeckView(deckId)}>
                                <Text style={styles.deckHeader}>{deckId}</Text>
                                <Text style={styles.deckSubHeader}>{decks[deckId].questions.length} cards</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    : <Text style={styles.noDecksText}>No Decks Created</Text>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    deckHeader: {
        fontSize: 30,
        marginTop: 30,
    },
    deckSubHeader: {
        fontSize: 17,
        marginTop: 5,
    },
    noDecksText: {
        fontSize: 20,
        marginTop: 30,
    }
})

function mapStateTopProps (decks) {
    return {
        decks
    }
}

export default connect(mapStateTopProps)(DeckListView)