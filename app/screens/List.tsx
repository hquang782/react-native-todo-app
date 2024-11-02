import { useEffect, useState } from "react";
import {
  Button,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { FIRESTORE_DB } from "../../firebaseConfig";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { Feather, Ionicons } from "@expo/vector-icons";

export interface Todo {
  title: string;
  done: boolean;
  id: string;
}

const List = ({ navigation }: any) => {
  const [todos, setTodos] = useState<any[]>([]);
  const [todo, setTodo] = useState("");

  useEffect(() => {
    const todoRef = collection(FIRESTORE_DB, "todos");

    const subscriber = onSnapshot(todoRef, {
      next: (snapshot) => {
        console.log("UPDATED");
        const todos: any[] = [];
        snapshot.docs.forEach((doc) => {
          todos.push({
            id: doc.id,
            ...doc.data(),
          } as Todo);
        });
        setTodos(todos);
      },
    });
    return () => subscriber();
  }, []);

  const addTodo = async () => {
    await addDoc(collection(FIRESTORE_DB, "todos"), {
      title: todo,
      done: false,
    });
    setTodo("");
  };

  const renderTodo = ({ item }: any) => {
    const toggleDone = async () => {};
    const deleteItem = async () => {};

    return (
      <View className="border-2 border-gray-300 p-4 rounded-md mb-2">
        <TouchableOpacity onPress={toggleDone} className="flex-row items-center">
          <Text className="flex-1 text-lg">{item.title}</Text>
          {item.done ? (
            <Ionicons name="checkmark-circle-outline" size={24} color="black" />
          ) : (
            <Feather name="circle" size={24} color="black" />
          )}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View className="flex-1 px-5 py-5">
      <View className="flex-row items-center mb-4">
        <TextInput
          className="flex-1 h-10 border border-gray-300 rounded-md p-2 bg-white"
          placeholder="Add new todo"
          onChangeText={(text: string) => setTodo(text)}
          value={todo}
        />
        <Button onPress={addTodo} title="Add Todo" disabled={todo === ""} />
      </View>
      {todos.length > 0 && (
        <FlatList
          data={todos}
          renderItem={renderTodo}
          keyExtractor={(todo: Todo) => todo.id}
        />
      )}
    </View>
  );
};

export default List;
