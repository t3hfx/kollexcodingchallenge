import {useFormik} from 'formik';
import React, {FC, useMemo, useRef, useState} from 'react';
import {
  Alert,
  Animated,
  Keyboard,
  ReturnKeyType,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import {LineGraph} from 'react-native-graph';

import {fetchCurrencyResults} from '@/api/api';
import {Background} from '@/components/Background';
import {Button} from '@/components/Button';
import {Form} from '@/components/Form';
import {Input} from '@/components/Input';
import {black, gray200, purple300} from '@/constants/colors';
import {font} from '@/constants/style';
import {ConversionApiError, ConversionRate} from '@/types/api';
import {Point} from '@/types/converter';
import {validateCurrencies} from '@/utils/converter';

type State = {
  firstCurrency: string;
  secondCurrency: string;
};

const initialValues = {
  firstCurrency: '',
  secondCurrency: '',
};

export const Converter: FC = () => {
  const firstCurrencyInputRef = useRef<TextInput>(null);
  const secondCurrencyInputRef = useRef<TextInput>(null);

  const [conversionData, setConversionData] = useState<ConversionRate>();

  const opacity = useRef(new Animated.Value(0)).current;
  const [fadedIn, setFadedIn] = useState(false);

  const points: Point[] = useMemo(() => {
    return Array<number>(8)
      .fill(0)
      .map((_, index) => ({
        date: new Date(index),
        value: Math.random(),
      }));
  }, []);

  const fade = (fadingIn: boolean) => {
    Animated.timing(opacity, {
      toValue: fadingIn ? 1 : 0,
      useNativeDriver: true,
      duration: 100,
    }).start(() => setFadedIn(fadingIn));
  };

  const formik = useFormik<State>({
    initialValues,
    initialStatus: false,
    validateOnChange: true,
    validate: values =>
      validateCurrencies(
        values.firstCurrency,
        values.secondCurrency,
        fadedIn,
        fade,
      ),
    onSubmit: async (value, {setStatus}) => {
      Keyboard.dismiss();
      setStatus(true);
      try {
        const result = await fetchCurrencyResults(
          value.firstCurrency,
          value.secondCurrency,
        );
        setConversionData(result);
        fade(true);
      } catch (e) {
        const error = e as ConversionApiError;
        Alert.alert(error.result, error['error-type']);
        return;
      } finally {
        setStatus(false);
      }
    },
  });

  const focusNext = () => {
    secondCurrencyInputRef.current?.focus();
  };

  const firstCurrencyInputProps = useMemo(() => {
    return {
      ref: firstCurrencyInputRef,
      onChangeText: formik.handleChange('firstCurrency'),
      value: formik.values.firstCurrency,
      returnKeyType: 'next' as ReturnKeyType,
      onSubmitEditing: focusNext,
      placeholder: 'AER',
      autoCapitalize: 'characters' as TextInputProps['autoCapitalize'],
      maxLength: 3,
    };
  }, [formik]);

  const secondCurrencyInputProps = useMemo(() => {
    return {
      ref: secondCurrencyInputRef,
      onChangeText: formik.handleChange('secondCurrency'),
      value: formik.values.secondCurrency,
      returnKeyType: 'done' as ReturnKeyType,
      onSubmitEditing: formik.handleSubmit,
      placeholder: 'INR',
      autoCapitalize: 'characters' as TextInputProps['autoCapitalize'],
      maxLength: 3,
    };
  }, [formik]);

  return (
    <Background style={styles.container}>
      <Form style={styles.form} closeButton>
        <Text style={styles.header}>Currency converter</Text>
        <Animated.View style={{opacity}}>
          <Text
            style={
              styles.currency1text
            }>{`1 ${formik.values.firstCurrency} equals`}</Text>
          <Text style={styles.currency2text}>
            {conversionData?.conversion_rate
              ? `${conversionData?.conversion_rate} ${formik.values.secondCurrency}`
              : 'No data'}
          </Text>
        </Animated.View>

        <View style={styles.inputsContainer}>
          <Input
            containerStyle={styles.inputContainer}
            {...firstCurrencyInputProps}
          />
          <Text style={styles.arrowRight}>{'->'}</Text>
          <Input
            containerStyle={styles.inputContainer}
            {...secondCurrencyInputProps}
          />
        </View>
        <Button
          style={styles.resultButton}
          title={'Result'}
          onPress={formik.handleSubmit}
          disabled={formik.status}
          loading={formik.status}
        />
        <View>
          <LineGraph
            style={styles.graph}
            animated
            color={purple300}
            points={points}
          />
          <View style={styles.datesContainer}>
            {points.map((i, index) => (
              <Text key={index} style={styles.date}>
                {String(i.date.getFullYear())}
              </Text>
            ))}
          </View>
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
    minHeight: 400,
  },
  header: {
    color: purple300,
    textTransform: 'uppercase',
    ...font(29, 29, '300'),
    marginTop: 25,
    textAlign: 'center',
  },
  currency1text: {
    color: gray200,
    ...font(15, 15, '500'),
    marginTop: 12,
  },
  currency2text: {
    color: gray200,
    ...font(20, 20, '500'),
    marginTop: 10,
  },
  inputsContainer: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputContainer: {
    flex: 1,
  },
  arrowRight: {
    ...font(15, 15, '500'),
    color: black,
    marginHorizontal: 15,
  },
  resultButton: {
    marginTop: 15,
    height: 45,
  },
  graph: {
    marginTop: 15,
    width: '100%',
    height: 70,
  },
  datesContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  date: {
    ...font(10, 10, '500'),
    color: black,
    marginHorizontal: 0,
  },
});
