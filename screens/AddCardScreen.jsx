"use client"

import { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from "react-native"
import { useDeck } from "../context/DeckContext"
import { useNavigation, useRoute } from "@react-navigation/native"

export default function AddCardScreen() {
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")
  const { addCard, getDeck } = useDeck()
  const navigation = useNavigation()
  const route = useRoute()
  const { deckId } = route.params

  const deck = getDeck(deckId)

  const handleAddCard = () => {
    if (question.trim() === "" || answer.trim() === "") {
      Alert.alert("Erro", "Por favor, preencha a pergunta e a resposta")
      return
    }

    addCard(deckId, question, answer)
    setQuestion("")
    setAnswer("")
    Alert.alert("Sucesso", "Flashcard adicionado com sucesso!")
  }

  const handleFinish = () => {
    if (deck?.cards.length === 0) {
      Alert.alert("Erro", "Adicione pelo menos um flashcard antes de finalizar")
      return
    }
    navigation.navigate("Home")
  }

  const handleStudy = () => {
    if (deck?.cards.length === 0) {
      Alert.alert("Erro", "Adicione pelo menos um flashcard antes de estudar")
      return
    }
    navigation.navigate("Flashcard", { deckId })
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.deckTitle}>{deck?.title}</Text>
      <Text style={styles.cardCount}>{deck?.cards.length || 0} cartões no deck</Text>

      <View style={styles.formContainer}>
        <Text style={styles.label}>Pergunta</Text>
        <TextInput
          style={styles.input}
          value={question}
          onChangeText={setQuestion}
          placeholder="Digite a pergunta"
          multiline
        />

        <Text style={styles.label}>Resposta</Text>
        <TextInput
          style={[styles.input, styles.answerInput]}
          value={answer}
          onChangeText={setAnswer}
          placeholder="Digite a resposta"
          multiline
        />

        <TouchableOpacity style={styles.addButton} onPress={handleAddCard}>
          <Text style={styles.buttonText}>Adicionar Flashcard</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity style={[styles.button, styles.studyButton]} onPress={handleStudy}>
          <Text style={styles.buttonText}>Estudar Agora</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.finishButton]} onPress={handleFinish}>
          <Text style={styles.buttonText}>Finalizar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
  },
  deckTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  cardCount: {
    fontSize: 16,
    color: "#666",
    marginBottom: 24,
  },
  formContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: "top",
  },
  answerInput: {
    marginBottom: 24,
  },
  addButton: {
    backgroundColor: "#4e73df",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40,
  },
  button: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  studyButton: {
    backgroundColor: "#28a745",
    marginRight: 8,
  },
  finishButton: {
    backgroundColor: "#6c757d",
    marginLeft: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
})

