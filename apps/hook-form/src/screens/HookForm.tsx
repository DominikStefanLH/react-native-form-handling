import React, { useCallback } from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import InputLabel from '../components/InputLabel';
import Input from '../components/Input';
import ErrorLabel from '../components/ErrorMessage';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  name: z.string().min(1, 'wrong length').max(30),
  email: z.string().email('Email is invalid'),
});

type FormType = {
  name: string;
  email: string;
};

export default function HookForm() {
  const { control, handleSubmit, formState } = useForm<FormType>({
    mode: 'onTouched',
    defaultValues: {
      name: '',
      email: '',
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = useCallback(
    (data: FormType) => {
      Alert.alert(
        !formState.isValid ? 'Form has Errors' : 'Form is OK',
        JSON.stringify(data, null, 2)
      );
    },
    [formState.isValid]
  );

  return (
    <View style={styles.container}>
      <Text>Hook Form</Text>
      <View>
        <InputLabel>Email</InputLabel>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value }, fieldState }) => (
            <>
              <Input
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                isError={fieldState.invalid}
              />
              <ErrorLabel>{fieldState.error?.message}</ErrorLabel>
            </>
          )}
          name="email"
        />
      </View>
      <View>
        <InputLabel>Name</InputLabel>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value }, fieldState }) => (
            <>
              <Input
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                isError={fieldState.invalid}
              />
              <ErrorLabel>{fieldState.error?.message}</ErrorLabel>
            </>
          )}
          name="name"
        />
      </View>
      <Button title={'Submit'} onPress={handleSubmit(onSubmit)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    rowGap: 8,
  },
});
