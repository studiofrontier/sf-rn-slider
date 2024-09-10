import { Dimensions, StyleSheet } from 'react-native';

const ABSOLUTE_COLOR = 'white';
const { width } = Dimensions.get('window');

export default StyleSheet.create({
  slider: {
    // flex: 1,
    // justifyContent: 'center',
  },
  maskedView: {
    flex: 1,
  },
  maskContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  gradientView: {
    width: width, // Match screen width to cover the edges
    height: '100%',
  },
  tickerContainer: {
    gap: 8,
    paddingHorizontal: '50%',
    alignItems: 'center',
    height: 200,
  },
  triangleTopLeft: {
    transform: [{ rotate: '-8deg' }],
    height: 8,
    top: 80,
    width: '20%',
    backgroundColor: ABSOLUTE_COLOR,
    position: 'absolute',
    left: -20,
    zIndex: 1,
  },
  triangleBottomLeft: {
    transform: [{ rotate: '8deg' }],
    height: 8,
    top: 111,
    width: '20%',
    backgroundColor: ABSOLUTE_COLOR,
    position: 'absolute',
    left: -20,
    zIndex: 1,
  },
  triangleTopRight: {
    transform: [{ rotate: '8deg' }],
    height: 8,
    top: 80,
    width: '20%',
    backgroundColor: ABSOLUTE_COLOR,
    position: 'absolute',
    right: -20,
    zIndex: 1,
  },
  triangleBottomRight: {
    transform: [{ rotate: '-8deg' }],
    height: 8,
    top: 111,
    width: '20%',
    backgroundColor: ABSOLUTE_COLOR,
    position: 'absolute',
    right: -20,
    zIndex: 1,
  },
  gradient: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  tickerItem: {
    width: 2,
    // backgroundColor: 'royalblue',
  },
  centreTicker: {
    height: '60%',
    width: 2,
    left: '50%',
    right: '50%',
    borderRadius: 10,
    position: 'absolute',
    // backgroundColor: 'royalblue',
  },
  scrollContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginTop: 12,
  },
  sliderContainer: {},
  image: {
    width: '100%',
    height: '80%',
    objectFit: 'contain',
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 32,
  },
  bottomText: {
    color: 'gray',
    fontWeight: '700',
    fontSize: 10,
    lineHeight: 14,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  bottomIcon: {
    height: 10,
    width: 10,
    tintColor: 'lightgray',
  },
});
