import { Text, StyleSheet } from 'react-native';
import React from 'react';

export default function InputLabel({ children }: React.PropsWithChildren) {
  return <Text style={styles.text}>{children}</Text>;
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    marginBottom: 8,
  },
});
