import React, { useState } from 'react';
import {
  ActivityIndicator,
  Button,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { FIREBASE_AUTH } from '../../firebaseConfig';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log('RESPONSE:', response);
    } catch (error) {
      console.log('ERROR:', error);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      console.log('RESPONSE:', response);
      alert('Please check your emails!');
    } catch (error) {
      console.log('ERROR:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          value={email}
          style={styles.input}
          placeholder='Email'
          autoCapitalize='none'
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          value={password}
          style={styles.input}
          secureTextEntry={true}
          placeholder='Password'
          autoCapitalize='none'
          onChangeText={(text) => setPassword(text)}
        />
      </View>

      <View style={styles.buttonContainer}>
        {loading ? (
          <ActivityIndicator size='large' color='white' />
        ) : (
          <>
            <Button title='Login' onPress={signIn} />
            <Button title='Create account' onPress={signUp} />
          </>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

export default Login;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    flex: 1,
    justifyContent: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    marginVertical: 5,
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: 'white',
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});
