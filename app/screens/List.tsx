import { View, Text, Button, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FIRESTORE_DB } from '../../firebaseConfig';
import { addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Entypo } from '@expo/vector-icons';

export interface Todo {
    title: string;
    done: boolean;
    id: string;

}

const List = ({ navigation }: any) => {
    const [todos, setTodos] = useState<any[]>([]);
    const [todo, setTodo] = useState('');

    useEffect(() => {
        const todoRef = collection(FIRESTORE_DB, 'todos');
        const subscriber = onSnapshot(todoRef, {
            next: (snapshot) => {
                const todos: Todo[]= [];
                snapshot.docs.forEach((doc) => {
                    console.log(doc.data());
                    todos.push({
                        id: doc.id,
                        ...doc.data(),
                    } as Todo);
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

    const renderTodo = ({ item }: any) => {
        const ref = doc(FIRESTORE_DB, `todos/${item.id}`);

        const toggleDone = async() => {
            updateDoc(ref, { done: !item.done })
        }

        const deleteTask = async() => {
            deleteDoc(ref);
        }

        return (
            <View style={styles.todoContainer}>
                <TouchableOpacity onPress={toggleDone} style={styles.todo}>
                    {item.done && <Ionicons name='md-checkmark-circle' size={30} color='green' />}
                    {!item.done && <Entypo name='circle' size={30} color='black' />}
                    <Text style={styles.todoText}>{item.title}</Text>
                </TouchableOpacity>
                <Ionicons name='trash-bin-outline' size={30} color='red' onPress={deleteTask} />
            </View>
        )
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
                <FlatList 
                    data={todos}
                    renderItem={renderTodo}
                    keyExtractor={(todo: Todo) => todo.id}
                />
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
    todoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'orange',
        padding: 10,
        marginVertical: 4,
    },
    todoText: {
        flex: 1,
        paddingHorizontal: 10,
    },
    todo: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
});