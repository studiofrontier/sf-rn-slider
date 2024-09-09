export const ranges = [
  { min: 0, max: 5000, increment: 1000 }, // 1k
  { min: 5000, max: 10000, increment: 1000 }, // 1k
  { min: 10000, max: 100000, increment: 5000 }, // 5k
  { min: 100000, max: 500000, increment: 20000 }, // 20k
  { min: 500000, max: 1000000, increment: 50000 }, // 50k
  { min: 1000000, max: 5000000, increment: 100000 }, // 100k
];

/**
 * @param {number} scrollOffset
 * @return {number} The calculated amount based on the scroll offset and ranges
 */
export const calculateAmount = (scrollOffset: number) => {
  'worklet';

  let accumulated = 0; // Set initial amount
  let remainingOffset = scrollOffset;

  // Iterate over the ranges
  for (const range of ranges) {
    const rangeSize = range.max - range.min;
    const tickerCount = rangeSize / range.increment;
    const rangeOffset = tickerCount * 10; // Each increment takes 10px of scroll

    // If the remaining offset is within this range
    if (remainingOffset <= rangeOffset) {
      const calculatedAmount =
        accumulated + (remainingOffset / 10) * range.increment;
      return Math.round(calculatedAmount);
    }

    // Update accumulated amount and remainingOffset for the next range
    accumulated += rangeSize;
    remainingOffset -= rangeOffset;
  }

  // Ensure the final accumulated value does not fall short when scrolling to the maximum value
  return Math.round(accumulated);
};
