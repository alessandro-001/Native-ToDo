import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import List from './app/screens/List';
import Details from './app/screens/Details';
import Login from './app/screens/Login';
import { useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from './firebaseConfig';

const Stack = createNativeStackNavigator(); 
const InsideStack = createNativeStackNavigator();

function InsideLayout() {
  return (
    <InsideStack.Navigator>
      <InsideStack.Screen name='My todos' component={List} />
      <InsideStack.Screen name='Details' component={Details} />
    </InsideStack.Navigator>
  )
}

export default function App() {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
      onAuthStateChanged(FIREBASE_AUTH, (user) => {
        console.log('user', user);
        setUser(user);
      })
    }, [])

  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Login'>
          {user ? (
            <Stack.Screen name='Inside' component={InsideLayout} options={{headerShown: false}} />
          ) : (
            <Stack.Screen name='Login' component={Login} options={{headerShown: false}} />
          )}

          {/* <Stack.Screen name='My To-Dos' component={List} />
          <Stack.Screen name='Details' component={Details} /> */}
        </Stack.Navigator>
      </NavigationContainer>
  );
}




