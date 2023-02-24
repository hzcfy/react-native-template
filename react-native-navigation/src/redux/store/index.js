
import Navigator from '../../navigator'
import configureStore from './create_store'
import NavReducer from '../../lib/nav_reducer'

class NavigationStore {
  Navigator;
  router;
  store;
  persistor;
  reducer;

  create (
    {
      routeConfigMap,
      navigatorConfig,
      persistKeyPrefix,
      persistNavReducer,
      storage
    },
    navMiddleware,
    onLoadingComplete
  ) {
    this.Navigator = Navigator(routeConfigMap, navigatorConfig)
    this.router = this.Navigator.router
    this.reducer = NavReducer(this.Navigator)
    const { store, persistor } = configureStore({
      reducers: {
        systechNavReducer: this.reducer
      },
      persistKeyPrefix,
      persistNavReducer,
      storage
    }, navMiddleware, onLoadingComplete)

    this.store = store
    this.persistor = persistor
    NavigationStore.Instance = this
    return this
  }

  static getNavigationStore () {
    if (!NavigationStore.Instance) {
      console.warn('You should wait the NavigationStore init complete')
    }
    return NavigationStore.Instance
  }
}

export default NavigationStore
