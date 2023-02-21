export function assert (expr, failDescription) {
  if (!expr) {
    throw new Error(`[@systech/react-native-navigation] ${failDescription}`)
  }
}
