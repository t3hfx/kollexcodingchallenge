import React, {FC} from 'react';
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';

import {purple200, white} from '@/constants/colors';
import {font} from '@/constants/style';

type Props = {
  style?: StyleProp<ViewStyle>;
  title: string;
};

export const Button: FC<Props> = ({style, title}) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: purple200,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    paddingVertical: 12,
  },
  title: {
    ...font(16),
    color: white,
  },
});
