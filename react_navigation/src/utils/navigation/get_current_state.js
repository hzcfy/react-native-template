export default function getCurrentState (props) {
  if (props) {
    const { index, routes } = props
    if (routes && routes.length > 0) {
      if (routes[index] && routes[index].routes && routes[index].routes.length > 0) {
        return getCurrentState(routes[index])
      }
      return routes[index]
    }
    return {}
  }
  return {}
}
