import {useFormik} from 'formik';
import React, {FC, useMemo} from 'react';
import {Keyboard, ReturnKeyType, StyleSheet, Text, View} from 'react-native';

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
  const formik = useFormik<State>({
    initialValues,
    initialStatus: false,
    validateOnChange: false,
    validate: validateUsernameAndPassword,
    onSubmit: async (value, {setStatus}) => {
      Keyboard.dismiss();
      // setFirebaseError(undefined);
      setStatus(true);
      // try {
      //   await auth().sendPasswordResetEmail(value.email);
      // } catch (e) {
      //   const error = e as Error;
      //   setFirebaseError(error.message);
      //   if (!error.message.includes('user-not-found') && !error.message.includes('invalid-email')) {
      //     Bugsnag.notify({
      //       name: 'Password reset error',
      //       message: error.message,
      //     });
      //   }
      //   return;
      // } finally {
      //   setStatus(false);
      // }
      // navigation.navigate(Screens.LinkSent);
    },
  });

  const emailInputProps = useMemo(() => {
    return {
      onChangeText: formik.handleChange('username'),
      value: formik.values.username,
      error: formik.errors.username,
      returnKeyType: 'next' as ReturnKeyType,
      placeholder: 'Username',
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values, formik.errors]);

  const passwordInputProps = useMemo(() => {
    return {
      onChangeText: formik.handleChange('password'),
      value: formik.values.password,
      error: formik.errors.password,
      returnKeyType: 'done' as ReturnKeyType,
      onSubmitEditing: formik.handleSubmit,
      placeholder: 'Password',
      secureTextEntry: true,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values, formik.errors]);

  return (
    <Background style={styles.container}>
      <Form style={styles.form}>
        <Text style={styles.loginText}>Login</Text>
        <Input containerStyle={styles.usernameInput} {...emailInputProps} />
        <Input containerStyle={styles.passwordInput} {...passwordInputProps} />
        <Button style={styles.loginButton} title={'Login'} />
        <View style={styles.bottomButtonsContainer}>
          <Text style={styles.bottomButton}>Sign up</Text>
          <Text style={styles.bottomButton}>Forgot password?</Text>
        </View>
      </Form>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
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
