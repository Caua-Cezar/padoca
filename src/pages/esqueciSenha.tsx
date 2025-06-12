import React, { useState } from 'react';
import { Alert, Pressable, Text, TextInput, View } from 'react-native';

export default function EsqueciSenhaScreen() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  async function enviarEmail() {
    if (!email.trim()) {
      Alert.alert('Erro', 'Informe o email');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('http://192.168.1.102:3333/auth/esqueci-senha', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const json = await res.json();
      if (res.ok) {
        Alert.alert('Sucesso', 'Token enviado para seu email (simulado). Confira o console no backend para o token!');
      } else {
        Alert.alert('Erro', json.message || 'Erro ao enviar email');
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro na conexão');
    }
    setLoading(false);
  }

  return (
    <View className="flex-1 bg-[#8a1a18] justify-center items-center px-5">
      <View className="w-full bg-white/10 p-5 rounded-xl">
        <Text className="text-white text-base mb-5">
          Informe seu e-mail para recuperação de senha:
        </Text>
        <TextInput
          className="border-b border-white text-white mb-5 py-2"
          placeholder="Email"
          placeholderTextColor="#ccc"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Pressable
          className={`bg-white py-3 rounded ${loading ? 'opacity-50' : 'opacity-100'}`}
          onPress={enviarEmail}
          disabled={loading}
        >
          <Text className="text-center text-[#8a1a18] font-bold">
            {loading ? 'Enviando...' : 'Enviar'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
