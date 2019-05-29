import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

class CardView extends Component {
    state = {
        showAnswer: false,
    }

    flipCard = () => {
        this.setState({
            showAnswer: !this.state.showAnswer,
        })
    }

    render() {
        const { card, onAnswerCard } = this.props
        const { showAnswer } = this.state

        return (
            <View>
                { showAnswer === false
                    ?   <View style={styles.container}>
                            <Text style={styles.text}>{card.question}</Text>
                            <TouchableOpacity onPress={this.flipCard}>
                                <Text style={styles.flipCardText}>Answer</Text>
                            </TouchableOpacity>
                        </View>
                    :   <View style={styles.container}>
                            <Text style={styles.text}>{card.answer}</Text>
                            <TouchableOpacity onPress={this.flipCard} >
                                <Text style={styles.flipCardText}>Question</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.correctBtn} onPress={() => onAnswerCard(true)}>
                                <Text style={styles.btnText}>Correct</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.incorrectBtn} onPress={() => onAnswerCard(false)}>
                                <Text style={styles.btnText}>Incorrect</Text>
                            </TouchableOpacity>
                        </View>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        justifyContent: 'center',
        padding: 15,
    },
    text: {
        fontSize: 40,
        textAlign: 'center',
    },
    flipCardText: {
        fontSize: 15,
        color: 'red',
        marginTop: 30,
        textAlign: 'center',
        width: 300,
    },
    correctBtn: {
        backgroundColor: 'green',
        width: 300,
        marginTop: 100,
        borderRadius: 5,
    },
    incorrectBtn: {
        backgroundColor: 'red',
        width: 300,
        marginTop: 20,
        borderRadius: 5,
    },
    btnText: {
        color: 'white',
        textAlign: 'center',
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 30,
        paddingRight: 30,
    }
})

export default CardView