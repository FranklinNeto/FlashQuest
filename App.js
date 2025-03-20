
import { NavigationContainer } from "@react-navigation/native"
//import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createStackNavigator } from '@react-navigation/stack';
import { DeckProvider } from "./context/DeckContext"
import HomeScreen from "./screens/HomeScreen"
import CreateDeckScreen from "./screens/CreateDeckScreen"
import FlashcardScreen from "./screens/FlashcardScreen"
import AddCardScreen from "./screens/AddCardScreen"

const Stack = createStackNavigator()

export default function App() {
  return (
    <DeckProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: "FlashQuest" }} />
          <Stack.Screen name="CreateDeck" component={CreateDeckScreen} options={{ title: "Criar Deck" }} />
          <Stack.Screen name="AddCard" component={AddCardScreen} options={{ title: "Adicionar Flashcard" }} />
          <Stack.Screen
            name="Flashcard"
            component={FlashcardScreen}
            options={{ title: "Estudar Flashcards", headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </DeckProvider>
  )
}


