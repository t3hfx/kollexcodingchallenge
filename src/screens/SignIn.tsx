import {useFormik} from 'formik';
import React, {FC, useMemo, useRef, useState} from 'react';
import {
  Keyboard,
  ReturnKeyType,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {login} from '@/api/api';
import {Background} from '@/components/Background';
import {Button} from '@/components/Button';
import {Form} from '@/components/Form';
import {Input} from '@/components/Input';
import {purple300, purple400, red100} from '@/constants/colors';
import {font} from '@/constants/style';
import {ApiError} from '@/types/api';
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
  const [apiError, setApiError] = useState<string>();
  const formik = useFormik<State>({
    initialValues,
    initialStatus: false,
    validateOnChange: false,
    validate: validateUsernameAndPassword,
    onSubmit: async (value, {setStatus}) => {
      Keyboard.dismiss();
      setApiError(undefined);
      setStatus(true);
      try {
        await login(value.username, value.password);
        console.log('success');
      } catch (e) {
        const error = e as ApiError;
        setApiError(error.error.message);
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
          {apiError && (
            <View style={styles.errorView}>
              <Text style={styles.errorText}>{apiError}</Text>
            </View>
          )}

          <Button
            style={styles.loginButton}
            title={'Login'}
            onPress={formik.handleSubmit}
            disabled={formik.status}
            loading={formik.status}
          />
          <View style={styles.bottomButtonsContainer}>
            <Text style={styles.bottomButton}>Signup</Text>
            <Text style={styles.bottomButton}>Forgot Password?</Text>
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
    minHeight: 400,
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
    height: 45,
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
  errorView: {
    marginTop: 20,
    borderColor: red100,
    borderWidth: 2,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
  },
  errorText: {
    ...font(16),
    color: red100,
  },
});
