import date from './date'
import judge from './judge'
import transform from './transform'

export default {
  date,
  ...transform,
  ...judge
}
