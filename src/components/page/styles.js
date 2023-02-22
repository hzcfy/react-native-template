
import { StyleSheet } from '../theme'

export default StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    backgroundColor: '$BG'
  },
  loadingView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginTop: '$BORDER_BOLD_WIDTH'
  }
})

export const header = StyleSheet.create({
  container: {
    width: '100%',
    height: '44 + $STATUS_BAR_HEIGHT',
    flexDirection: 'row',
    backgroundColor: '$PRIMARY',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '$STATUS_BAR_HEIGHT'
  },
  containerCommon: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: '$STATUS_BAR_HEIGHT'
  },
  leftContainer: {
    left: 15
  },
  rightContainer: {
    right: 15
  },
  Reg15: {
    fontWeight: '$REGULAR',
    fontSize: '$BODY'
  },
  Med17: {
    fontWeight: '$MEDIUM',
    fontSize: '$TITLE'
  }
})
