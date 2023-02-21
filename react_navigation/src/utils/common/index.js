export function assert(expr, failDescription) {
  if (!expr) {
    throw new Error(`[@sxc/react-native-navigation] ${failDescription}`);
  }
}
