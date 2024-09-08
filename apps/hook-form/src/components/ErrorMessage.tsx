import { StyleSheet, Text, TextProps } from 'react-native';
import React from 'react';
import { Colors } from '../utils/colors';

interface ErrorLabelProps {
  children: TextProps['children'];
  style?: TextProps['style'];
}

export default function ErrorLabel({ children, style }: ErrorLabelProps) {
  return <Text style={[styles.text, style]}>{children || ' '}</Text>;
}

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    minHeight: 18,
    color: Colors.error,
    marginTop: 4,
  },
});
