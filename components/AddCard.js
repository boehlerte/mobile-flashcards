import React, { Component } from 'react'
import {
    Text,
    View,
    TextInput,
    StyleSheet,
    KeyboardAvoidingView,
    TouchableOpacity
} from 'react-native'

class AddCard extends Component {
    state = {
        question: '',
        answer: '',
    }

    onSubmitCard = () => {
        console.log('submitted', this.state.question, this.state.answer);
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
        justifyContent: 'center',
    },
    input: {
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 5,
        height: 50,
        width: 350,
        marginBottom: 30,
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

export default AddCard