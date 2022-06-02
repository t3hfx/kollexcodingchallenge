import React, {FC} from 'react';
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';

import {gray100, purple200, white} from '@/constants/colors';
import {font} from '@/constants/style';

type Props = TouchableOpacityProps & {
  style?: StyleProp<ViewStyle>;
  title: string;
  loading?: boolean;
};

export const Button: FC<Props> = ({style, title, loading, ...props}) => {
  return (
    <TouchableOpacity
      style={[styles.container, loading && styles.loadingButton, style]}
      {...props}>
      {!loading ? (
        <Text style={styles.title}>{title}</Text>
      ) : (
        <ActivityIndicator />
      )}
    </TouchableOpacity>
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
  loadingButton: {
    backgroundColor: gray100,
  },
  title: {
    ...font(16),
    color: white,
  },
});
