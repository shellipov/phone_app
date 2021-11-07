import { Animated } from "react-native";


export const fadeIn = (element, timeout=0) => {
  setTimeout(() => {
    Animated.timing(element, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  }, timeout);
};

export  const fadeOut = (element, duration = 50) => {
  Animated.timing(element, {
    toValue: 0,
    duration: duration,
    useNativeDriver: true,
  }).start();
};
