import React, {FC} from 'react';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaView} from 'react-native-safe-area-context';

import {backgroundGradient} from '@/constants/colors';

type Props = {
  style?: StyleProp<ViewStyle>;
};

export const Background: FC<Props> = ({style, children}) => {
  return (
    <SafeAreaView style={[styles.container, style]}>
      <LinearGradient
        colors={backgroundGradient.colors}
        locations={backgroundGradient.locations}
        style={styles.backgroundGradient}
      />
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundGradient: {
    ...StyleSheet.absoluteFillObject,
  },
});
