import React, {Component} from 'react'
import { Provider } from 'react-redux'
import EntryComponent from './src/entry'
import store from './src/store'

class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <EntryComponent />
      </Provider>
    )
  }
}

export default App
