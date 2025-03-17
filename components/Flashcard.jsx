"use client"

import { useRef, useState } from "react"
import { Text, StyleSheet, TouchableOpacity, Animated, Dimensions } from "react-native"

const { width } = Dimensions.get("window")

export default function Flashcard({ card }) {
  const [isFlipped, setIsFlipped] = useState(false)
  const flipAnimation = useRef(new Animated.Value(0)).current

  const flipCard = () => {
    Animated.spring(flipAnimation, {
      toValue: isFlipped ? 0 : 1,
      friction: 8,
      tension: 10,
      useNativeDriver: true,
    }).start()

    setIsFlipped(!isFlipped)
  }

  const frontInterpolate = flipAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  })

  const backInterpolate = flipAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["180deg", "360deg"],
  })

  const frontAnimatedStyle = {
    transform: [{ rotateY: frontInterpolate }],
  }

  const backAnimatedStyle = {
    transform: [{ rotateY: backInterpolate }],
  }

  return (
    <TouchableOpacity activeOpacity={1} onPress={flipCard} style={styles.container}>
      <Animated.View style={[styles.card, frontAnimatedStyle, styles.frontCard]}>
        <Text style={styles.questionText}>{card.question}</Text>
        <Text style={styles.tapHint}>Toque para ver a resposta</Text>
      </Animated.View>

      <Animated.View style={[styles.card, backAnimatedStyle, styles.backCard]}>
        <Text style={styles.answerLabel}>Resposta:</Text>
        <Text style={styles.answerText}>{card.answer}</Text>
        <Text style={styles.tapHint}>Toque para ver a pergunta</Text>
      </Animated.View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    width: width - 40,
    height: 400,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    backfaceVisibility: "hidden",
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  frontCard: {
    backgroundColor: "#4e73df",
  },
  backCard: {
    backgroundColor: "#28a745",
  },
  questionText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  answerLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
    alignSelf: "flex-start",
  },
  answerText: {
    fontSize: 22,
    color: "#fff",
    textAlign: "center",
  },
  tapHint: {
    position: "absolute",
    bottom: 20,
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 14,
  },
})

