# RangeSlider Component

The `RangeSlider` component allows you to create a customizable, scrollable range selector. It supports both "amount" and "default" variants and comes with a dynamic snapping mechanism.

## Installation

```bash
npm install sf-rn-slider
```

## Usage

The `RangeSlider` component has full TypeScript support. Here's how to use it in a TypeScript project.

```tsx
import React, { useState } from 'react';
import { View, Text, StatusBar, StyleSheet } from 'react-native';
import { RangeSlider } from 'sf-rn-slider';

export default function App() {
  const [sliderValue, setSliderValue] = useState<number>(0);

  return (
    <View style={styles.main}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
      <Text style={styles.text}>${sliderValue.toLocaleString()}</Text>
      <RangeSlider
        onValueChange={setSliderValue}
        color="royalblue"
        variant="amount"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
```

## RangeSlider Props

| Prop                  | Type                      | Optional | Default       | Description                                                                                                                               |
| --------------------- | ------------------------- | -------- | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `onValueChange`       | `(value: number) => void` | No       |               | A callback function that is triggered when the value changes. It passes the calculated value based on scroll offset.                      |
| `variant`             | `'amount' \| 'default'`   | Yes      | `'default'`   | Variant to determine the behavior of the slider. - 'amount' for monetary value. - 'default' for the default variant.                      |
| `color`               | `string`                  | Yes      | `'royalblue'` | The color of the center ticker.                                                                                                           |
| `backgroundColor`     | `string`                  | Yes      | `'white'`     | Background color of the slider container.                                                                                                 |
| `initialScrollOffset` | `number`                  | Yes      | `0`           | The initial scroll offset for the slider. The offset should be a multiple of 10. For example, `initialScrollOffset = 30` means index = 3. |

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
