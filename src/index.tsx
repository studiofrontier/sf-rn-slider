import { useCallback, useMemo, useRef } from 'react';
import {
  View,
  FlatList,
  type NativeSyntheticEvent,
  type NativeScrollEvent,
} from 'react-native';
import Styles from './styles';
import { calculateAmount } from './helpers';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import MaskedView from '@react-native-masked-view/masked-view';
import LinearGradient from 'react-native-linear-gradient';

interface Props {
  setRangeValue: (arg1: number) => void;
  color?: string;
  numOfTickers?: number;
}

export const TickerSlider = ({ setRangeValue, color, numOfTickers }: Props) => {
  const flatListRef = useRef<FlatList>(null);
  const previousScrollOffset = useRef(0); // Track the previous scroll offset

  const sliderRangeArray = useMemo(
    () => Array.from({ length: numOfTickers ?? 99 }),
    [numOfTickers]
  );

  const handleFlatlistScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const scrollOffset = event.nativeEvent.contentOffset.x;

      const snapOffset = Math.floor(scrollOffset / 10) * 10;

      if (scrollOffset > 0) {
        if (snapOffset !== previousScrollOffset.current) {
          previousScrollOffset.current = snapOffset;
          const moneyUnit = calculateAmount(snapOffset);
          setRangeValue(moneyUnit);
          ReactNativeHapticFeedback.trigger('impactLight', {
            ignoreAndroidSystemSettings: true,
            enableVibrateFallback: true,
          });
        }
      }
    },
    [setRangeValue]
  );

  return (
    <View style={Styles.slider}>
      <View style={Styles.sliderContainer}>
        <View style={Styles.scrollContainer}>
          <View
            style={[
              Styles.centreTicker,
              { backgroundColor: color ?? 'royalblue' },
            ]}
          />
          <View style={Styles.triangleTopLeft} />
          <View style={Styles.triangleBottomLeft} />
          <View style={Styles.triangleTopRight} />
          <View style={Styles.triangleBottomRight} />
          <MaskedView
            style={Styles.maskedView}
            maskElement={
              <View style={Styles.maskContainer}>
                <LinearGradient
                  colors={['transparent', 'black', 'black', 'transparent']}
                  locations={[0.0, 0.3, 0.7, 1.0]} // Adjusted locations for wider fade
                  style={Styles.gradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                />
              </View>
            }
          >
            <FlatList
              alwaysBounceHorizontal={false}
              ref={flatListRef}
              onScroll={handleFlatlistScroll}
              data={sliderRangeArray}
              horizontal
              showsHorizontalScrollIndicator={false}
              snapToInterval={10}
              scrollEventThrottle={16}
              getItemLayout={(data: any, index: number) => {
                if (!data) {
                  return { length: 0, offset: 0, index };
                }
                // Define the heights
                const HEIGHT_ODD = 40;
                const HEIGHT_EVEN = 28;

                // Calculate the offset
                const offset = data!
                  .slice(0, index)
                  .reduce(
                    (total: number, _: any, i: number) =>
                      total + (i % 2 === 0 ? HEIGHT_ODD : HEIGHT_EVEN),
                    0
                  );

                // Determine the height of the current item
                const length = index % 2 === 0 ? HEIGHT_ODD : HEIGHT_EVEN;

                return { length, offset, index };
              }}
              decelerationRate={'normal'}
              contentContainerStyle={[
                Styles.tickerContainer,
                {
                  backgroundColor: color ?? 'royalblue',
                },
              ]}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ index }) => {
                const TICKER_HEIGHT = index % 2 === 0 ? 40 : 28;
                return (
                  <View
                    style={[
                      Styles.tickerItem,
                      {
                        height: TICKER_HEIGHT,
                      },
                    ]}
                  />
                );
              }}
            />
          </MaskedView>
        </View>
      </View>
    </View>
  );
};
