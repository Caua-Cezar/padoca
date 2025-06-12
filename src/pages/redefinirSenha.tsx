import React, { useState } from 'react';
import { Alert, Button, Text, TextInput, View } from 'react-native';

export default function RedefinirSenhaScreen() {
  const [token, setToken] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmaSenha, setConfirmaSenha] = useState('');
  const [loading, setLoading] = useState(false);

  async function redefinirSenha() {
    if (!token.trim() || !senha.trim() || !confirmaSenha.trim()) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }
    if (senha !== confirmaSenha) {
      Alert.alert('Erro', 'As senhas não conferem');
      return;
    }
    setLoading(true);

    try {
      const res = await fetch('http://192.168.1.102:3333/auth/redefinir-senha', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, senha }),
      });
      const json = await res.json();
      if (res.ok) {
        Alert.alert('Sucesso', 'Senha redefinida com sucesso');
        // Aqui você pode navegar para a tela de login, por exemplo.
      } else {
        Alert.alert('Erro', json.message || 'Erro ao redefinir senha');
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro na conexão');
    }
    setLoading(false);
  }

  return (
    <View style={{ padding: 20 }}>
      <Text>Informe o token recebido e a nova senha:</Text>

      <TextInput
        placeholder="Token"
        value={token}
        onChangeText={setToken}
        autoCapitalize="none"
        style={{ borderBottomWidth: 1, marginBottom: 20 }}
      />

      <TextInput
        placeholder="Nova senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
        style={{ borderBottomWidth: 1, marginBottom: 20 }}
      />

      <TextInput
        placeholder="Confirme a nova senha"
        value={confirmaSenha}
        onChangeText={setConfirmaSenha}
        secureTextEntry
        style={{ borderBottomWidth: 1, marginBottom: 20 }}
      />

      <Button title={loading ? 'Redefinindo...' : 'Redefinir Senha'} onPress={redefinirSenha} disabled={loading} />
    </View>
  );
}
