import React, {FC} from 'react';
import {StyleSheet, Text} from 'react-native';

import {Background} from '@/components/Background';
import {Form} from '@/components/Form';
import {black} from '@/constants/colors';

export const SignIn: FC = () => {
  return (
    <Background style={styles.container}>
      <Form>
        <Text style={styles.text}>asdadasdsad</Text>
      </Form>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  text: {
    color: black,
  },
});
