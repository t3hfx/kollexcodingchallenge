import React, {FC, forwardRef} from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  ViewStyle,
} from 'react-native';

import {black, gray100, gray200, red100} from '@/constants/colors';
import {font} from '@/constants/style';

type Props = TextInputProps & {
  containerStyle?: StyleProp<ViewStyle>;
  error?: string;
};

export const Input: FC<Props> = forwardRef<TextInput, TextInputProps & Props>(
  (props, ref) => {
    const {containerStyle, error, ...restProps} = props;
    return (
      <Pressable
        onPress={() => {
          if (ref != null && typeof ref !== 'function') ref?.current?.focus();
        }}
        style={[styles.container, containerStyle]}>
        <TextInput
          ref={ref}
          style={[styles.input, restProps.style]}
          placeholderTextColor={gray200}
          selectionColor={gray200}
          keyboardAppearance={'dark'}
          numberOfLines={1}
          editable
          {...restProps}
        />
        {!!error && <Text style={styles.error}>{error}</Text>}
      </Pressable>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    height: 42,
    borderRadius: 5,
    backgroundColor: gray100,
    paddingVertical: 7,
    paddingHorizontal: 15,
  },
  input: {
    color: black,
    flex: 1,
    padding: 0,
  },
  error: {
    marginTop: 12,
    ...font(15),
    color: red100,
  },
});
