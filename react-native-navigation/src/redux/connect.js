
import { connect } from 'react-redux'
import { storeKey } from '../config'

function connectAdvanced (mapStateToProps, mapDispatchToProps, mergeProps, options) {
  return connect(mapStateToProps, mapDispatchToProps, mergeProps, {
    storeKey,
    ...options
  })
}

export default connectAdvanced
