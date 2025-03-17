"use client"

import { createContext, useState, useContext } from "react"

const DeckContext = createContext(undefined)

export const DeckProvider = ({ children }) => {
  const [decks, setDecks] = useState([])

  const addDeck = (title) => {
    const newDeck = {
      id: Date.now().toString(),
      title,
      cards: [],
    }
    setDecks([...decks, newDeck])
    return newDeck.id
  }

  const addCard = (deckId, question, answer) => {
    setDecks(
      decks.map((deck) => {
        if (deck.id === deckId) {
          return {
            ...deck,
            cards: [
              ...deck.cards,
              {
                id: Date.now().toString(),
                question,
                answer,
              },
            ],
          }
        }
        return deck
      }),
    )
  }

  const getDeck = (deckId) => {
    return decks.find((deck) => deck.id === deckId)
  }

  return <DeckContext.Provider value={{ decks, addDeck, addCard, getDeck }}>{children}</DeckContext.Provider>
}

export const useDeck = () => {
  const context = useContext(DeckContext)
  if (context === undefined) {
    throw new Error("useDeck must be used within a DeckProvider")
  }
  return context
}
