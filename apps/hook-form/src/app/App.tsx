import React, { useCallback, useRef, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Linking,
  Button,
} from 'react-native';
import NativeHandleForm from '../screens/NativeHandleForm';
import HookForm from '../screens/HookForm';

type Screens = 'nativeHandleForm' | 'hookForm';

export const App = () => {
  const [activeScreen, setActiveScreen] = useState<Screens>('nativeHandleForm');

  const switchScreens = useCallback(() => {
    if (activeScreen === 'nativeHandleForm') {
      setActiveScreen('hookForm');
    }
    if (activeScreen === 'hookForm') {
      setActiveScreen('nativeHandleForm');
    }
  }, [activeScreen]);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView
        style={{
          flex: 1,
        }}
      >
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}
        >
          <Button title={'Switch Screen'} onPress={switchScreens} />

          {activeScreen === 'hookForm' && <HookForm />}
          {activeScreen === 'nativeHandleForm' && <NativeHandleForm />}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#ffffff',
    padding: 16,
  },
});

export default App;
