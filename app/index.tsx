import { useEffect, useState } from "react";
import {
  Button,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../firebaseConfig";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/context/AuthContext";
import { router } from "expo-router";
import { signOut } from "firebase/auth";

export interface Todo {
  title: string;
  done: boolean;
  id: string;
}

const Index = () => {
  const [todos, setTodos] = useState<any[]>([]);
  const [todo, setTodo] = useState("");
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/Login");
      return;
    }

    if (user) {
      const todoRef = query(
        collection(FIRESTORE_DB, "todos"),
        where("uid", "==", user.uid)
      );

      const subscriber = onSnapshot(todoRef, {
        next: (snapshot) => {
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
    }
  }, [loading, user]);
  if (loading) {
    return <Text>Loading...</Text>;
  }
  const addTodo = async () => {
    await addDoc(collection(FIRESTORE_DB, "todos"), {
      title: todo,
      done: false,
      uid: user?.uid,
    });
    setTodo("");
  };
  const handleSignOut = async () => {
    try {
      await signOut(FIREBASE_AUTH);

      router.replace("/Login");
    } catch (error) {
      alert("Error signing out:" + error);
    }
  };

  const renderTodo = ({ item }: any) => {
    const ref = doc(FIRESTORE_DB, `todos/${item.id}`);
    const toggleDone = async () => {
      await updateDoc(ref, { done: !item.done });
    };
    const deleteItem = async () => {
      deleteDoc(ref);
    };

    return (
      <View className="border-2 flex-row  border-gray-300 p-4 rounded-md mb-2">
        <TouchableOpacity onPress={toggleDone} className="items-center">
          {item.done ? (
            <Ionicons name="checkmark-circle-outline" size={24} color="black" />
          ) : (
            <Feather name="circle" size={24} color="black" />
          )}
        </TouchableOpacity>
        <View className="justify-start text-center flex-1">
          <Text className="text-lg ml-3 ">{item.title}</Text>
        </View>
        <TouchableOpacity onPress={deleteItem}>
          <FontAwesome name="trash-o" size={24} color="black" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View className="flex-1 px-5 py-5">
      <View className="flex-row items-center my-8">
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

      <Button title="Sign Out" onPress={handleSignOut} color="red" />
    </View>
  );
};

export default Index;
