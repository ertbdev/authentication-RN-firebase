type Color = {
  light: string;
  main: string;
  dark: string;
};

export type Colors = {
  primary: Color;
  secondary: Color;
  text: Color;
  error: Color;
  warning: Color;
  info: Color;
  success: Color;
  background: {
    screen: string;
    card: string;
    textInput: string;
  };
};
