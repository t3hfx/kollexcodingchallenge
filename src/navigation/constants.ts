export enum Screens {
  SignIn = 'SignIn',
  Converter = 'Converter',
}

export type RootContainerStackParamList = {
  [Screens.SignIn]: {back: boolean} | undefined;
  [Screens.Converter]: undefined;
};
