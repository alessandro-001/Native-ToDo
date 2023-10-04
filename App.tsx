import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import List from './app/screens/List';
import Details from './app/screens/Details';
import Login from './app/screens/Login';
import { useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from './firebaseConfig';
import { Text, TouchableOpacity } from 'react-native';

const Stack = createNativeStackNavigator(); 

function InsideLayout({ navigation }: any) {
  const logout = () => {
    FIREBASE_AUTH.signOut();
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name='MyTodos'
        component={List}
        options={{
          headerTitle: 'My Todos',
          headerRight: () => (
            <TouchableOpacity onPress={logout} style={{ marginRight: 16 }}>
              <Text style={{ color: 'red', fontWeight: 'bold' }}>Logout</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen name='Details' component={Details} />
    </Stack.Navigator>
  );
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log('user', user);
      setUser(user);
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        {user ? (
          <Stack.Screen name='Inside' component={InsideLayout} options={{ headerShown: false }} />
        ) : (
          <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
