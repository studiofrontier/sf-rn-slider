declare module IRangeSlider {
  export interface IRangeSliderProps {
    /**
     * Color of the tickers on the slider.
     */
    color: string;
    /**
     * Callback for updatig the value from the Slider
     */
    setValue: (val: number) => void;
  }
}
