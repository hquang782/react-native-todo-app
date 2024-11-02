import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import List from "./app/screens/List";
import Detail from "./app/screens/Detail";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="my Todos" component={List} />
        <Stack.Screen name="my Details" component={Detail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
