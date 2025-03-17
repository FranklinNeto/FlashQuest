import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native"
import { useDeck } from "../context/DeckContext"
import { useNavigation } from "@react-navigation/native"

export default function HomeScreen() {
  const { decks } = useDeck()
  const navigation = useNavigation()

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.deckItem}
      onPress={() => {
        if (item.cards.length > 0) {
          navigation.navigate("Flashcard", { deckId: item.id })
        } else {
          navigation.navigate("AddCard", { deckId: item.id })
        }
      }}
    >
      <Text style={styles.deckTitle}>{item.title}</Text>
      <Text style={styles.cardCount}>{item.cards.length} cartões</Text>
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      {decks.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>Nenhum deck criado ainda</Text>
          <Text style={styles.emptySubtext}>Crie seu primeiro deck para começar</Text>
        </View>
      ) : (
        <FlatList
          data={decks}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
        />
      )}
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate("CreateDeck")}>
        <Text style={styles.addButtonText}>+ Criar Novo Deck</Text>
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
  list: {
    paddingBottom: 80,
  },
  deckItem: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  deckTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  cardCount: {
    fontSize: 14,
    color: "#666",
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#4e73df",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#666",
  },
})

