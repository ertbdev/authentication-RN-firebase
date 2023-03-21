import React from 'react';

import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useTheme} from 'styled-components/native';
import {Colors} from '../../styles/themes/types';

type Props = {
  /** Determines the height of the button and the fontSize */
  height?: number;
  /** Determines the minimun width of the button */
  minWidth?: number | string;
  /** Determines the borderRadius of the button */
  borderRadius?: number;
  /** Determines the color of the button  */
  buttonColor?: string;
  /** Determines the text color of the button string */
  textColor?: string;
  /**
   * The margin property must be specified using four values.
   * The margins apply to the top, right, bottom, and left in that order (clockwise).
   * @default [0, 0, 0, 0]
   *  */
  margin?: [number, number, number, number];
  children: string;
  onPress?: () => void;
};

const Button = ({height = 50, minWidth, borderRadius = 10, buttonColor, textColor, margin, children, onPress}: Props) => {
  const {colors} = useTheme();
  const styles = makeStyles(colors, height, borderRadius, minWidth, buttonColor, textColor, margin);
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.8} onPress={onPress}>
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  );
};

const makeStyles = (
  colors: Colors,
  height: number,
  borderRadius: number,
  minWidth?: number | string,
  buttonColor?: string,
  textColor?: string,
  margin?: [number, number, number, number],
) =>
  StyleSheet.create({
    container: {
      height: height,
      paddingHorizontal: 10,
      minWidth: minWidth,
      borderRadius: borderRadius,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: buttonColor || colors.primary.main,
      marginTop: margin ? margin[0] : 0,
      marginRight: margin ? margin[1] : 0,
      marginBottom: margin ? margin[2] : 0,
      marginLeft: margin ? margin[3] : 0,
    },
    text: {
      fontSize: Math.ceil(height * 0.4),
      fontWeight: '600',
      color: textColor || colors.text.button,
    },
  });

export default Button;
