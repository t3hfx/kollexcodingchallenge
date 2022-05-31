export enum Screens {
  SignIn = 'SignIn',
  Converter = 'Converter',
}

export type RootContainerStackParamList = {
  [Screens.SignIn]: undefined;
  [Screens.Converter]: undefined;
};
