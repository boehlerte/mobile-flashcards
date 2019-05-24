import React, { Component } from 'react'
import {
    Text,
    View,
    TextInput,
    StyleSheet,
    KeyboardAvoidingView,
    TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'
import { addCardToDeck } from '../utils/api';
import { handleAddCard } from '../actions';

class AddCard extends Component {
    static navigationOptions = () => {
        return {
            title: 'Add Card'
        }
    }

    state = {
        question: '',
        answer: '',
    }

    onSubmitCard = () => {
        const { question, answer } = this.state
        const { deckId } = this.props.navigation.state.params
        const card = {
            question,
            answer,
        }
        this.props.dispatch(handleAddCard(card, deckId))
    }

    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={{flex: 1}} enabled>
                <View style={styles.container}>
                    <TextInput
                        placeholder='Question'
                        style={styles.input}
                        value={this.state.question}
                        onChangeText={(question) => this.setState({ question })}
                    />
                    <TextInput
                        placeholder='Answer'
                        style={styles.input}
                        value={this.state.answer}
                        onChangeText={(answer) => this.setState({ answer })}
                    />
                    <TouchableOpacity
                        onPress={this.onSubmitCard}
                        style={styles.submitBtn}
                    >
                        <Text style={styles.submitBtnText}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 75,
    },
    input: {
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 5,
        height: 50,
        width: 350,
        marginBottom: 20,
        padding: 10,
        fontSize: 20,
    },
    submitBtn: {
        backgroundColor: 'purple',
        color: 'white',
        borderRadius: 5,
        marginTop: 350,
        width: 300,
    },
    submitBtnText: {
        color: 'white',
        fontSize: 20,
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 30,
        paddingRight: 30,
        textAlign: 'center',
    }
})

function mapStateToProps(decks, { navigation }) {
    const { deckId } = navigation.state.params;
    return {
        deckId
    }
}

export default connect()(AddCard)