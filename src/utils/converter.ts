export const validateCurrencies = (
  firstCurrency: string,
  secondCurrency: string,
  fadedIn: boolean,
  setFadedIn: (fadedIn: boolean) => void,
) => {
  const firstCurrencyError = validateCurrency(firstCurrency);
  const secondCurrencyError = validateCurrency(secondCurrency);
  if (fadedIn) setFadedIn(false);

  if (firstCurrencyError || secondCurrencyError) {
    return {
      firstCurrency: firstCurrencyError,
      secondCurrency: secondCurrencyError,
    };
  }
};

const validateCurrency = (currency: string) => {
  if (currency.length < 3) return 'Currency should be 3 symbols';
};
