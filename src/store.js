import { init } from '@rematch/core'
import createLoadingPlugin from '@rematch/loading'
import createRematchPersist from '@rematch/persist'
import storage from '@react-native-async-storage/async-storage'

import models from 'models'

const loading = createLoadingPlugin({})
const persist = createRematchPersist({
  whitelist: ['user'],
  throttle: 2000,
  version: 1,
  storage
})

const options = {
  models,
  plugins: [loading, persist],
  redux: {
    initialState: {},
    extraReducers: {},
    onAction: [],
    onError (e) {
      console.log('onError', e)
    }
    // middlewares: [logger]
  }
}
const store = init(options)

export default store
