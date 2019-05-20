import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation'
import { Ionicons, Entypo } from '@expo/vector-icons'
import reducer from './reducers'
import DeckListView from './components/DeckListView'
import AddCard from './components/AddCard'
import AddDeck from './components/AddDeck'

const Tabs = createBottomTabNavigator(
  {
    Decks: {
      screen: DeckListView,
      navigationOptions: {
        tabBarLabel: 'Decks',
        tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
      }
    },
    AddDeck: {
      screen: AddDeck,
      navigationOptions: {
        tabBarLabel: 'Add Deck',
        tabBarIcon: ({ tintColor }) => <Entypo name='plus' size={30} color={tintColor} />
      }
    }
  }, {
    navigationOptions: {
      header: null
    },
    tabBarOptions: {
      activeTintColor: 'purple',
      style: {
        height: 56,
        backgroundColor: 'white',
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1
      }
    }
  }
)

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={styles.container}>
          <Tabs />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
