import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function App() {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let timer;
    if (isPlaying && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsPlaying(false);
    }
    return () => clearInterval(timer);
  }, [isPlaying, timeLeft]);

  const handleTap = () => {
    if (isPlaying) {
      setScore(score + 1);
    }
  };

  const startGame = () => {
    setScore(0);
    setTimeLeft(10);
    setIsPlaying(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tap Game</Text>
      <Text style={styles.score}>Score: {score}</Text>
      <Text style={styles.timer}>Time Left: {timeLeft}s</Text>
      <Button title={isPlaying ? 'Tap!' : 'Start Game'} onPress={isPlaying ? handleTap : startGame} />
      {!isPlaying && timeLeft === 0 && (
        <Text style={styles.result}>Game Over! Your score: {score}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fefefe' },
  title: { fontSize: 30, fontWeight: 'bold', marginBottom: 20 },
  score: { fontSize: 24, marginBottom: 10 },
  timer: { fontSize: 20, marginBottom: 20 },
  result: { fontSize: 24, color: 'green', marginTop: 20 },
});