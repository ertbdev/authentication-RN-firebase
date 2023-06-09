type Color = {
  light: string;
  main: string;
  dark: string;
};

export type Colors = {
  primary: Color;
  secondary: Color;
  text: Color & {button: string};
  error: Color;
  warning: Color;
  info: Color;
  success: Color;
  background: {
    screen: string;
    card: string;
    textInput: string;
    statusBar: string;
  };
};
