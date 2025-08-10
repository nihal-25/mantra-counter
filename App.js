import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Vibration, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
const [count, setCount] = useState(0);
  const [target, setTarget] = useState(108);

  
  useEffect(() => {
    (async () => {
      try {
    const savedCount = await AsyncStorage.getItem('count');
       const savedTarget = await AsyncStorage.getItem('target');

        if (savedCount) setCount(parseInt(savedCount));
    if (savedTarget) setTarget(parseInt(savedTarget));
      } catch (err) {
        console.log('Error loading saved data', err);
      }
    })();
  }, []);

  
  useEffect(() => {
    AsyncStorage.setItem('count', count.toString());
    AsyncStorage.setItem('target', target.toString());
  }, [count, target]);

  const handleIncrement = () => {
    const newCount = count + 1;
    setCount(newCount);

    if (newCount === target) {
      
   if (Platform.OS !== 'web') {
   Vibration.vibrate(1000);    }
      Alert.alert('🎉 Target Reached', `You completed ${target} repetitions!`);
    }
  };

  const handleReset = () => {
    setCount(0);
  };

  const handleSetTarget = () => {
    Alert.prompt(
    'Set Target',
      'Enter a new target number',
      (value) => {
        const num = parseInt(value);
        if (!isNaN(num) && num > 0) {
          setTarget(num);
        } else {
     Alert.alert('Invalid Input', 'Please enter a positive number.');
        }
      },
      'plain-text',
      target.toString()
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🕉 Mantra Counter</Text>

      <Text style={styles.count}>{count}</Text>
      <Text style={styles.target}>Target: {target}</Text>

      <TouchableOpacity style={styles.bigButton} onPress={handleIncrement}>
        <Text style={styles.bigButtonText}>+1</Text>
      </TouchableOpacity>

      <View style={styles.row}>
        <TouchableOpacity style={styles.smallButton} onPress={handleReset}>
          <Text style={styles.smallButtonText}>Reset</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.smallButton} onPress={handleSetTarget}>
          <Text style={styles.smallButtonText}>Set Target</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20
  },
  count: {
    fontSize: 70,
    fontWeight: 'bold',
    marginBottom: 10
  },
  target: {
    fontSize: 18,
    marginBottom: 30
  },
  bigButton: {
    backgroundColor: '#4caf50',
    padding: 40,
    borderRadius: 100,
    marginBottom: 20
  },
  bigButtonText: {
    fontSize: 26,
    color: 'white',
    fontWeight: 'bold'
  },
  smallButton: {
    backgroundColor: '#2196f3',
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 8,
    marginHorizontal: 10
  },
  smallButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  row: {
    flexDirection: 'row'
  }
});
