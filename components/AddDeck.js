import React, { Component } from 'react'
import {
    Text,
    View,
    TextInput,
    StyleSheet,
    KeyboardAvoidingView,
    TouchableOpacity
} from 'react-native'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { handleAddDeck } from '../actions';

class AddDeck extends Component {
    state = {
        deckTitle: '',
    }

    onCreateDeck = () => {
        this.props.dispatch(handleAddDeck(this.state.deckTitle))
        this.setState({deckTitle: ''})
        this.toDeckListView()
    }

    toDeckListView = () => {
        this.props.navigation.dispatch(NavigationActions.back({
            key: 'AddDeck'
        }))
    }

    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={{flex: 1}} enabled>
                <View style={styles.container}>
                    <Text style={styles.header}>What is the the title of your new deck?</Text>
                    <TextInput
                        placeholder='Deck Title'
                        style={styles.input}
                        value={this.state.deckTitle}
                        onChangeText={(deckTitle) => this.setState({ deckTitle })}
                    />
                    <TouchableOpacity
                        onPress={this.onCreateDeck}
                        style={styles.submitBtn}
                    >
                        <Text style={styles.submitBtnText}>Create Deck</Text>
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
        justifyContent: 'flex-start',
        marginTop: 150,
    },
    header: {
        fontSize: 30,
        textAlign: 'center',
    },
    input: {
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 5,
        height: 50,
        width: 350,
        marginBottom: 30,
        marginTop: 20,
        padding: 10,
        fontSize: 20,
    },
    submitBtn: {
        backgroundColor: 'purple',
        color: 'white',
        borderRadius: 5
    },
    submitBtnText: {
        color: 'white',
        fontSize: 20,
        padding: 10
    }
})

export default connect()(AddDeck)