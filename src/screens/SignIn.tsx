import {useFormik} from 'formik';
import React, {FC, useMemo, useRef} from 'react';
import {
  Keyboard,
  ReturnKeyType,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {Background} from '@/components/Background';
import {Button} from '@/components/Button';
import {Form} from '@/components/Form';
import {Input} from '@/components/Input';
import {purple300, purple400} from '@/constants/colors';
import {font} from '@/constants/style';
import {validateUsernameAndPassword} from '@/utils/auth';

type State = {
  username: string;
  password: string;
};

const initialValues = {
  username: '',
  password: '',
};

export const SignIn: FC = () => {
  const usernameInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const formik = useFormik<State>({
    initialValues,
    initialStatus: false,
    validateOnChange: false,
    validate: validateUsernameAndPassword,
    onSubmit: async (value, {setStatus}) => {
      Keyboard.dismiss();
      setStatus(true);
      try {
        console.log('Try it');
      } catch (e) {
        const error = e as Error;
        console.log('Error ', error);
        return;
      } finally {
        setStatus(false);
      }
      // navigation.navigate(Screens.LinkSent);
    },
  });

  const focusNext = () => {
    passwordInputRef.current?.focus();
  };

  const emailInputProps = useMemo(() => {
    return {
      ref: usernameInputRef,
      onChangeText: formik.handleChange('username'),
      value: formik.values.username,
      error: formik.errors.username,
      returnKeyType: 'next' as ReturnKeyType,
      onSubmitEditing: focusNext,
      placeholder: 'Username',
    };
  }, [formik]);

  const passwordInputProps = useMemo(() => {
    return {
      ref: passwordInputRef,
      onChangeText: formik.handleChange('password'),
      value: formik.values.password,
      error: formik.errors.password,
      returnKeyType: 'done' as ReturnKeyType,
      onSubmitEditing: formik.handleSubmit,
      placeholder: 'Password',
      secureTextEntry: true,
    };
  }, [formik]);

  return (
    <Background style={styles.container}>
      <KeyboardAwareScrollView
        keyboardDismissMode="on-drag"
        contentContainerStyle={styles.scrollContainer}>
        <Form style={styles.form}>
          <Text style={styles.loginText}>Login</Text>
          <Input containerStyle={styles.usernameInput} {...emailInputProps} />
          <Input
            containerStyle={styles.passwordInput}
            {...passwordInputProps}
          />
          <Button style={styles.loginButton} title={'Login'} />
          <View style={styles.bottomButtonsContainer}>
            <Text style={styles.bottomButton}>Sign up</Text>
            <Text style={styles.bottomButton}>Forgot password?</Text>
          </View>
        </Form>
      </KeyboardAwareScrollView>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  scrollContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  form: {
    paddingHorizontal: 40,
    height: 400,
  },
  loginText: {
    color: purple300,
    textTransform: 'uppercase',
    ...font(25, 25, '300'),
    marginTop: 25,
  },
  usernameInput: {
    marginTop: 20,
  },
  passwordInput: {
    marginTop: 10,
  },
  loginButton: {
    marginTop: 20,
  },
  bottomButtonsContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bottomButton: {
    ...font(16),
    color: purple400,
  },
});
