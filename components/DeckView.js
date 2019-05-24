import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'

class DeckView extends Component {
    static navigationOptions = ({ navigation }) => {
        const { deckId } = navigation.state.params

        return {
            title: deckId
        }
    }

    addCard = (deckId) => {
        this.props.navigation.navigate(
            'AddCard',
            { deckId }
        )
    }

    startQuiz = () => {
        // TODO: go to quiz view
    }

    deleteDeck = () => {
        // TODO: delete deck from view
        // go back to deck list view
    }

    render() {
        const { deck, numCards } = this.props
        return (
            <View style={styles.container}>
                <Text style={styles.header}>{deck.title}</Text>
                <Text style={styles.subHeader}>{numCards} cards</Text>
                <TouchableOpacity style={[styles.btn, {marginTop: 100}]} onPress={() => this.addCard(deck.title)}>
                    <Text style={styles.btnText}>Add Card</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btn, styles.startQuizBtn]}>
                    <Text style={[styles.btnText, styles.startQuizBtnText]}>Start Quiz</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.deleteBtnText}>Delete Deck</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

function mapStateToProps(decks, { navigation }) {
    const { deckId } = navigation.state.params;
    return {
        deck: decks[deckId],
        numCards: decks[deckId].questions.length
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 150,
    },
    header: {
        fontSize: 30,
    },
    subHeader: {
        fontSize: 17,
        marginTop: 10,
    },
    btn: {
        marginTop: 20,
        borderRadius: 5,
        borderColor: 'black',
        borderWidth: 2,
        width: 300,
    },
    btnText: {
        fontSize: 20,
        textAlign: 'center',
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 30,
        paddingRight: 30,
    },
    startQuizBtn: {
        backgroundColor: 'black',
    },
    startQuizBtnText: {
        color: 'white',
    },
    deleteBtnText: {
        marginTop: 20,
        color: 'red',
        fontSize: 15,
    }
})

export default connect(mapStateToProps)(DeckView)