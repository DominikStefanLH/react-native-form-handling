import { TextInputProps } from 'react-native';
import { StyleSheet, TextInput } from 'react-native';
import { Colors } from '../utils/colors';
import { useEffect, useState } from 'react';

type InputProps = TextInputProps & {
  isError?: boolean;
  isDisabled?: boolean;
};

export default function Input(props: InputProps) {
  const { isDisabled, isError } = props;
  const [borderColor, setBorderColor] = useState(Colors.separator);
  const [backgroundColor, setBackgroundColor] = useState(Colors.foreground);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (!isDisabled) {
      if (isError) {
        setBorderColor(Colors.error);
      } else if (isFocused) {
        setBorderColor(
          `rgba(${Colors.theme1RGB.r}, ${Colors.theme1RGB.g}, ${Colors.theme1RGB.b}, 0.6)`
        );
      } else {
        setBorderColor(Colors.separator);
      }
    }
    if (isDisabled) {
      setBackgroundColor(Colors.disabledInputBG);
      setBorderColor(Colors.separator);
    } else {
      setBackgroundColor(Colors.foreground);
    }
  }, [isDisabled, isError, isFocused]);

  return (
    <TextInput
      style={[styles.input, { borderColor, backgroundColor }]}
      {...props}
      onFocus={(arg) => {
        setIsFocused(true);
        props.onFocus?.(arg);
      }}
      onBlur={(arg) => {
        setIsFocused(false);
        props.onBlur?.(arg);
      }}
      editable={(props.editable !== undefined && props.editable) || !isDisabled}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    height: 44,
    width: '100%',
    fontSize: 16,
    borderRadius: 2,
    borderWidth: 1,
    color: Colors.primaryColor,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
});
