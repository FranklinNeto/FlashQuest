"use client"

import { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native"
import { useDeck } from "../context/DeckContext"
import { useNavigation } from "@react-navigation/native"

export default function CreateDeckScreen() {
  const [title, setTitle] = useState("")
  const { addDeck } = useDeck()
  const navigation = useNavigation()

  const handleCreateDeck = () => {
    if (title.trim() === "") {
      Alert.alert("Erro", "Por favor, insira um título para o deck")
      return
    }

    const deckId = addDeck(title)
    navigation.navigate("AddCard", { deckId })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome do Deck</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Ex: Matemática, História, Inglês..."
        autoFocus
      />
      <TouchableOpacity style={styles.button} onPress={handleCreateDeck}>
        <Text style={styles.buttonText}>Criar Deck</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
    fontSize: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  button: {
    backgroundColor: "#4e73df",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
})

