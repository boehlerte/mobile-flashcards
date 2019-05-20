import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

class DeckListView extends Component {
    render () {
        const { decks } = this.props
        return (
            <View style={styles.container}>
                <Text>Deck List View</Text>
                <View>
                    {Object.keys(decks).map((key) => (<Text key={key}>{key}</Text>))}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

function mapStateTopProps (decks) {
    return {
        decks
    }
}

export default connect(mapStateTopProps)(DeckListView)