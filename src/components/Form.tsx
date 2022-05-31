import React, {FC} from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';

import {white} from '@/constants/colors';

type Props = {
  style?: StyleProp<ViewStyle>;
};

export const Form: FC<Props> = ({style, children}) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: white,
    marginHorizontal: 20,
    borderRadius: 20,
  },
});
