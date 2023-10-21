import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function App() {
  const [tempo, setTempo] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setTempo((prevTempo) => prevTempo + 10); // Atualiza a cada 10 milissegundos
      }, 10);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  const iniciarCronometro = () => {
    setIsRunning(true);
  };

  const pararCronometro = () => {
    setIsRunning(false);
  };

  const reiniciarCronometro = () => {
    setTempo(0);
    setIsRunning(false);
  };

  // Função para formatar o tempo no formato "00:00:00"
  const formatarTempo = (tempo) => {
    const minutos = Math.floor(tempo / 60000);
    const segundos = Math.floor((tempo % 60000) / 1000);
    const milissegundos = tempo % 1000;

    return `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}:${milissegundos.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <View>
        <Text>{formatarTempo(tempo)}</Text>
      </View>
      <View style={styles.botoesContainer}>
        {!isRunning ? (
          <TouchableOpacity style={styles.botao} onPress={iniciarCronometro}>
            <Text>Começar</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.botao} onPress={pararCronometro}>
            <Text>Parar</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.botao} onPress={reiniciarCronometro}>
          <Text>Recomeçar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  botoesContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  botao: {
    margin: 10,
    padding: 10,
    backgroundColor: '#dddddd',
    borderRadius: 5,
  },
});
