import React from 'react';

import {ActivityIndicator, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useTheme} from 'styled-components/native';
import {Colors} from '../../styles/themes/types';

type Props = {
  /** Determines the borderRadius of the button */
  borderRadius?: number;
  /** Determines the color of the button  */
  buttonColor?: string;
  /** Text of the button */
  children: string;
  /** Determines the height of the button and the fontSize */
  height?: number;
  /**
   * The margin property must be specified using four values.
   * The margins apply to the top, right, bottom, and left in that order (clockwise).
   * @default [0, 0, 0, 0]
   *  */
  margin?: [number, number, number, number];
  /** Determines the minimun width of the button */
  minWidth?: number | string;
  loading?: boolean;
  /** Determines the text color of the button string */
  textColor?: string;
  onPress?: () => void;
};

const Button = ({height = 50, minWidth, borderRadius = 10, buttonColor, textColor, margin, loading, children, onPress}: Props) => {
  const {colors} = useTheme();
  const styles = makeStyles(colors, height, borderRadius, minWidth, buttonColor, textColor, margin);
  return (
    <TouchableOpacity disabled={loading} style={styles.container} activeOpacity={0.8} onPress={onPress}>
      {loading ? <ActivityIndicator size={height * 0.4} style={styles.activitiIndicator} color={textColor || colors.text.button} /> : null}
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
      flexDirection: 'row',
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
    activitiIndicator: {
      marginRight: 10,
    },
  });

export default Button;
