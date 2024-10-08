import { useCallback, useMemo, useRef } from 'react';
import {
  View,
  FlatList,
  type NativeSyntheticEvent,
  type NativeScrollEvent,
} from 'react-native';
import Styles from './styles';
import { calculateAmount, calculateDefaultScrollOffset } from './helpers';
import type { RangeSliderProps } from './types';
import RNReactNativeHapticFeedback from 'react-native-haptic-feedback';

export const RangeSlider = ({
  onValueChange,
  color,
  backgroundColor,
  variant = 'amount',
}: RangeSliderProps) => {
  const previousScrollOffset = useRef(0); // Track the previous scroll offset

  const sliderRangeArray = useMemo(
    () => Array.from({ length: variant === 'amount' ? 99 : 30 }),
    [variant]
  );

  const handleFlatlistScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const scrollOffset = event.nativeEvent.contentOffset.x;

      const snapOffset = Math.floor(scrollOffset / 10) * 10;

      if (scrollOffset > 0) {
        if (snapOffset !== previousScrollOffset.current) {
          previousScrollOffset.current = snapOffset;
          if (variant === 'amount') {
            const moneyUnit = calculateAmount(snapOffset);
            onValueChange(moneyUnit);
          } else {
            const defaultValue = calculateDefaultScrollOffset(snapOffset);
            onValueChange(defaultValue);
          }
          RNReactNativeHapticFeedback.trigger('impactLight', {
            ignoreAndroidSystemSettings: true,
            enableVibrateFallback: true,
          });
        }
      }
    },
    [onValueChange, variant]
  );

  // const renderCornerTriangles = () => (
  //   <>
  //     <View
  //       style={[
  //         Styles.triangleTopLeft,
  //         { backgroundColor: backgroundColor ?? 'white' },
  //       ]}
  //     />
  //     <View
  //       style={[
  //         Styles.triangleBottomLeft,
  //         { backgroundColor: backgroundColor ?? 'white' },
  //       ]}
  //     />
  //     <View
  //       style={[
  //         Styles.triangleTopRight,
  //         { backgroundColor: backgroundColor ?? 'white' },
  //       ]}
  //     />
  //     <View
  //       style={[
  //         Styles.triangleBottomRight,
  //         { backgroundColor: backgroundColor ?? 'white' },
  //       ]}
  //     />
  //   </>
  // );

  return (
    <View style={Styles.slider}>
      <View style={Styles.sliderContainer}>
        <View
          style={[
            Styles.scrollContainer,
            { backgroundColor: backgroundColor ?? 'white' },
          ]}
        >
          <View
            style={[
              Styles.centreTicker,
              { backgroundColor: color ?? 'royalblue' },
            ]}
          />
          <FlatList
            alwaysBounceHorizontal={false}
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
            contentContainerStyle={Styles.tickerContainer}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ index }) => {
              const TICKER_HEIGHT = index % 2 === 0 ? 40 : 28;
              return (
                <View
                  style={[
                    Styles.tickerItem,
                    {
                      height: TICKER_HEIGHT,
                      backgroundColor: color ?? 'royalblue',
                    },
                  ]}
                />
              );
            }}
          />
        </View>
      </View>
    </View>
  );
};
