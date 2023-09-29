import { View, Text, Button, StyleSheet, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FIRESTORE_DB } from '../../firebaseConfig';
import { addDoc, collection, onSnapshot } from 'firebase/firestore';

const List = ({ navigation }: any) => {
    const [todos, setTodos] = useState<any[]>([]);
    const [todo, setTodo] = useState('');

    useEffect(() => {
        const todoRef = collection(FIRESTORE_DB, 'todos');
        const subscriber = onSnapshot(todoRef, {
            next: (snapshot) => {
                const todos:any[]= [];
                snapshot.docs.forEach((doc) => {
                    console.log(doc.data());
                    todos.push({
                        id: doc.id,
                        ...doc.data(),
                    });
                });
                setTodos(todos);
            },
            
        })
        return () => subscriber();
    }, []);
    
    const addTodo = async () => {
        const doc =  await addDoc(collection(FIRESTORE_DB, 'todos'), { title: todo, done: false});
        setTodo('');
    }

  return (
    <View style={styles.container}>
        <View style={styles.form}>
            <TextInput 
                style={styles.input}
                placeholder='Add new task'
                onChangeText={(text: string) => setTodo(text)}
                value={todo}
            />
            <Button onPress={() => addTodo()} title='Add ToDo' disabled={todo === ''} />
        </View>
        {todos.length > 0 && (
            <View>
                {todos.map((item) => (
                    <Text key={item.id}>{item.title}</Text>
                ))}
            </View>
        )}
    </View>
  )
}

export default List

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
    },
    form: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
    input: {
        flex: 1,
        height: 40,
        borderRadius: 5,
        borderWidth: 1,
        padding: 10,
        backgroundColor: '#fff',
    },
});