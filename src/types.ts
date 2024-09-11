// src/types.ts
export interface RangeSliderProps {
  /**
   * A callback function that is triggered when the value changes.
   * @param {number} value - The calculated value based on scroll offset.
   */
  onValueChange: (value: number) => void;

  /**
   * Variant to determine the behavior of the slider.
   * - 'amount' for monetary value.
   * - 'default' for the default variant.
   * @default 'amount'
   */
  variant?: 'amount' | 'default';

  /**
   * Color of the center ticker.
   * @default 'royalblue'
   */
  color?: string;

  /**
   * Background color of the slider container.
   * @default 'white'
   */
  backgroundColor?: string;

  /**
   * The initial scroll offset for the slider.
   * The offset should be the multiple of 10. Each item has offset 10
   * initialScrollOffset = 30 which means index = 3
   * @default 0
   */
  initialScrollOffset?: number;
}
