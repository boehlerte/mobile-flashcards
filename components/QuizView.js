import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import CardView from './CardView';
import { StackActions } from 'react-navigation'

class QuizView extends Component {
    state = {
        currentCard: 0,
        score: 0,
    }

    answerCard = (isCorrect) => {
        if (isCorrect) {
            this.setState({
                score: this.state.score + 1
            })
        }
        this.setState({
            currentCard: this.state.currentCard + 1
        })
    }

    restartQuiz = () => {
        this.setState({
            currentCard: 0,
            score: 0,
        })
    }

    backToDeck = () => {
        this.props.navigation.dispatch(StackActions.pop({n: 1}))
    }

    render() {
        const { numCards, deck } = this.props
        const { currentCard, score } = this.state

        return (
            <View style={{flex: 1}}>
                { numCards > 0 
                    ?   <View style={styles.container}>
                            {currentCard <= numCards - 1
                                ?   <View>
                                        { deck.questions.map((card, index) => (
                                            <View key={index}>
                                                { currentCard === index
                                                    ?   <View style={{flex:1}}>
                                                            <Text style={styles.numCardsText}>{index + 1}/{numCards}</Text>
                                                            <CardView card={card} onAnswerCard={(isCorrect) => this.answerCard(isCorrect)} />
                                                        </View>
                                                    :   null
                                                }
                                            </View>
                                        ))}
                                    </View>
                                :   <View>
                                        <Text style={styles.scoreText}>
                                            {score/numCards * 100}% Correct
                                        </Text>
                                        <TouchableOpacity style={styles.restartBtn} onPress={this.restartQuiz}>
                                            <Text style={styles.restartBtnText}>
                                                Restart Quiz
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.goBackBtn} onPress={this.backToDeck}>
                                            <Text style={styles.goBackBtnText}>
                                                Back to Deck
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                            }
                            
                        </View>
                    :   <Text style={styles.noCardsText}>
                            Sorry, you cannot take a quiz because there are no cards in the deck.
                        </Text>
                }
            </View>
        )
    }
}

function mapStateToProps(decks, { navigation }) {
    const { deckId } = navigation.state.params;
    const numCards = decks[deckId].questions.length
    return {
        deck: decks[deckId],
        numCards
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 100,
    },
    noCardsText: {
        fontSize: 20,
        textAlign: 'center',
        marginTop: 100,
        padding: 20,
    },
    numCardsText: {
        fontSize: 20,
    },
    scoreText: {
        fontSize: 30,
        textAlign: 'center',
    },
    restartBtn: {
        width: 300,
        borderColor: 'black',
        borderRadius: 5,
        borderWidth: 2,
        marginTop: 30,
    },
    goBackBtn: {
        width: 300,
        backgroundColor: 'black',
        borderRadius: 5,
        borderWidth: 2,
        marginTop: 30,
    },
    restartBtnText: {
        fontSize: 15,
        paddingTop: 15, 
        paddingBottom: 15,
        paddingLeft: 30,
        paddingRight: 30,
        textAlign: 'center',
    },
    goBackBtnText: {
        fontSize: 15,
        paddingTop: 15, 
        paddingBottom: 15,
        paddingLeft: 30,
        paddingRight: 30,
        textAlign: 'center',
        color: 'white'
    }
})

export default connect(mapStateToProps)(QuizView)