import { useState } from "react";
import { Button, Text, TextInput, View, Alert } from "react-native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { router } from "expo-router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();

  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Login successful");
      router.replace('/')
    } catch (error: any) {  
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View className="flex-1 justify-center p-5 bg-white">
      <Text className="text-2xl font-bold mb-5 text-center">Login</Text>
      <TextInput
        className="border border-gray-300 p-3 mb-4 rounded"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        className="border border-gray-300 p-3 mb-4 rounded"
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Sign in" onPress={signIn} />
      <Button title="Go to Sign Up" onPress={() => router.push("./Signup")} />
    </View>
  );
};

export default Login;
