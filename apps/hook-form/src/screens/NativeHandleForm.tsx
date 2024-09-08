import { StyleSheet, View, Text, Button, Alert } from 'react-native';
import Input from '../components/Input';
import React, { useCallback, useEffect, useState } from 'react';
import InputLabel from '../components/InputLabel';
import { ErrorMessage } from '../ErrorList';
import ErrorLabel from '../components/ErrorMessage';

export default function NativeHandleForm() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState<undefined | ErrorMessage>(
    undefined
  );
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState<undefined | ErrorMessage>(
    undefined
  );

  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateName = useCallback(
    (nameValue?: string | unknown): ErrorMessage | undefined => {
      if (nameValue === undefined) {
        return 'Name is required';
      }
      if (typeof nameValue !== 'string') {
        return 'Name must be string.';
      }
      if (nameValue.trim() === '') {
        return 'Name is required';
      }
      if (nameValue.length > 30) {
        return 'Name should be greater than 30 characters';
      }
    },
    []
  );

  const validateEmail = useCallback(
    (emailValue?: string | unknown): ErrorMessage | undefined => {
      if (emailValue === undefined) {
        return 'Email is required';
      }
      if (typeof emailValue !== 'string') {
        return 'Email must be string.';
      }
      if (emailValue.trim() === '') {
        return 'Email is required';
      }
      if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(emailValue)) {
        return 'Email is not valid';
      }
    },
    []
  );

  useEffect(() => {
    if (isSubmitted) {
      setNameError(validateName(name));
    }
  }, [isSubmitted, name, validateName]);

  useEffect(() => {
    if (isSubmitted) {
      setEmailError(validateEmail(email));
    }
  }, [email, isSubmitted, validateEmail]);

  const onSubmit = useCallback(() => {
    setIsSubmitted(true);
    const isError = !!validateEmail(email) || !!validateName(name);

    Alert.alert(isError ? 'Form has Errors' : 'Form is OK', JSON.stringify({name, email}, null, 2))
  }, [email, name, validateEmail, validateName]);

  return (
    <View style={styles.container}>
      <Text>Native Handle Form</Text>
      <View>
        <InputLabel>Email</InputLabel>
        <Input
          value={email}
          onChangeText={(text) => setEmail(text)}
          isError={!!emailError}
        />
        <ErrorLabel>{emailError}</ErrorLabel>
      </View>
      <View>
        <InputLabel>Name</InputLabel>
        <Input
          value={name}
          onChangeText={(text) => setName(text)}
          isError={!!nameError}
        />
        <ErrorLabel>{nameError}</ErrorLabel>
      </View>
      <Button title={'Submit'} onPress={onSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    rowGap: 8,
  },
});
