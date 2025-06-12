import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { RootStackParamList } from '../navigation'; // ajuste o caminho conforme necessário

type SobreScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'sobre'>;

export default function Sobre() {
  const navigation = useNavigation<SobreScreenNavigationProp>();

  return (
    <ScrollView
      className="flex-1 bg-[#8a1a18]"
      contentContainerStyle={{ flexGrow: 1, padding: 24 }}
    >
      {/* Botão Voltar */}
      <TouchableOpacity
        onPress={() => navigation.navigate('home')}
        className="bg-blue-600 px-4 py-2 rounded-md self-start mb-6 mt-10"
      >
        <Text className="text-white font-semibold">← Voltar</Text>
      </TouchableOpacity>

      {/* Conteúdo Centralizado */}
      <View className="flex-1 justify-center items-center">
        <Text className="text-2xl font-bold text-white text-center">Sobre nós</Text>
        <Text className="text-base mt-4 text-white text-center">
          A Padoca Express surgiu da necessidade de tornar o café da manhã mais prático e acessível em um mundo cada vez mais corrido.
          O aplicativo resolve esse problema ao conectar as padarias locais com os clientes que desejam receber pães, bolos e cafés fresquinhos 
          diretamente em sua casa ou trabalho.
        </Text>
      </View>
    </ScrollView>
  );
}
