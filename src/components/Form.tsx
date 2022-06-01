import {useNavigation} from '@react-navigation/native';
import React, {FC, useRef} from 'react';
import {
  Animated,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';

import {red100, white} from '@/constants/colors';
import {font} from '@/constants/style';

import {AnimatedPressable} from './Animated';

type Props = {
  style?: StyleProp<ViewStyle>;
  closeButton?: boolean;
};

export const Form: FC<Props> = ({style, closeButton, children}) => {
  const navigation = useNavigation();
  const scale = useRef(closeButton ? new Animated.Value(1) : null).current;

  const onPress = (pressedIn: boolean) => {
    Animated.timing(scale as Animated.Value, {
      toValue: pressedIn ? 0.8 : 1,
      useNativeDriver: true,
      duration: 100,
    }).start();
    if (!pressedIn) navigation.goBack();
  };

  const animatedStyle = closeButton && {
    transform: [{scale} as {scale: Animated.Value}],
  };

  return (
    <View style={[styles.container, style]}>
      {closeButton && (
        <AnimatedPressable
          onPressIn={() => onPress(true)}
          onPressOut={() => onPress(false)}
          style={[styles.closeButton, animatedStyle]}>
          <Text style={styles.closeIcon}>X</Text>
        </AnimatedPressable>
      )}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: white,
    marginHorizontal: 20,
    borderRadius: 20,
  },
  closeButton: {
    position: 'absolute',
    top: -10,
    right: -10,
    height: 40,
    width: 40,
    backgroundColor: red100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  closeIcon: {
    ...font(20, 22, '500'),
    color: white,
  },
});
