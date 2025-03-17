"use client"

import { useState, useEffect } from "react"
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native"
import { useDeck } from "../context/DeckContext"
import { useRoute, useNavigation } from "@react-navigation/native"
import Flashcard from "../components/Flashcard"

export default function FlashcardScreen() {
  const route = useRoute()
  const navigation = useNavigation()
  const { deckId } = route.params
  const { getDeck } = useDeck()
  const deck = getDeck(deckId)

  const [cards, setCards] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (deck && deck.cards.length > 0) {
      // Embaralhar os cards
      const shuffledCards = [...deck.cards].sort(() => Math.random() - 0.5)
      setCards(shuffledCards)
    }
  }, [deck])

  const handleNext = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const handleFinish = () => {
    navigation.navigate("Home")
  }

  if (!deck || cards.length === 0) {
    return (
      <View style={styles.container}>
        <Text>Carregando...</Text>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleFinish} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>X</Text>
        </TouchableOpacity>
        <Text style={styles.deckTitle}>{deck.title}</Text>
        <Text style={styles.progress}>
          {currentIndex + 1} / {cards.length}
        </Text>
      </View>

      <View style={styles.cardContainer}>
        <Flashcard card={cards[currentIndex]} />
      </View>

      <View style={styles.navigationButtons}>
        <TouchableOpacity
          style={[styles.navButton, currentIndex === 0 && styles.disabledButton]}
          onPress={handlePrevious}
          disabled={currentIndex === 0}
        >
          <Text style={styles.navButtonText}>Anterior</Text>
        </TouchableOpacity>

        {currentIndex < cards.length - 1 ? (
          <TouchableOpacity style={styles.navButton} onPress={handleNext}>
            <Text style={styles.navButtonText}>Próximo</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={[styles.navButton, styles.finishButton]} onPress={handleFinish}>
            <Text style={styles.navButtonText}>Finalizar</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    zIndex: 10,
  },
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  deckTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  progress: {
    fontSize: 14,
    color: "#666",
  },
  cardContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  navigationButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  navButton: {
    flex: 1,
    backgroundColor: "#4e73df",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 8,
  },
  navButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  finishButton: {
    backgroundColor: "#28a745",
  },
})

