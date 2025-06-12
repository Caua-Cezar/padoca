import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    FlatList,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

type Produto = {
  id: number;
  nome: string;
  preco: number;
  categoria: string;
  imagem: string;
};

export default function ProdutosCrudScreen() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<Omit<Produto, 'id'>>({
    nome: '',
    preco: 0,
    categoria: '',
    imagem: '',
  });

  const [editandoId, setEditandoId] = useState<number | null>(null);

  const API_URL = 'http://192.168.1.102:3333/produtos'; // substitua por seu IP real no celular

  async function carregarProdutos() {
    setLoading(true);
    try {
  const res = await axios.get(API_URL);
  setProdutos(res.data);
} catch (error) {
  console.error("Erro ao carregar produtos:", error);
  Alert.alert('Erro ao carregar produtos');
}
    setLoading(false);
  }

  useEffect(() => {
    carregarProdutos();
  }, []);

  async function salvarProduto() {
  try {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      Alert.alert("Usuário não autenticado");
      return;
    }

    if (editandoId) {
      await axios.put(`${API_URL}/atualizar/${editandoId}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEditandoId(null);
    } else {
      await axios.post(`${API_URL}/criar`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
    }

    setForm({ nome: '', preco: 0, categoria: '', imagem: '' });
    carregarProdutos();
  } catch (error: unknown) {
  Alert.alert('Erro ao salvar produto');

  if (axios.isAxiosError(error)) {
    // error é um erro do axios, então pode ter response.data
    console.error('Erro ao salvar produto:', error.response?.data || error.message);
  } else if (error instanceof Error) {
    // erro genérico do JS
    console.error('Erro ao salvar produto:', error.message);
  } else {
    // qualquer outro tipo de erro
    console.error('Erro ao salvar produto:', error);
  }
}
}
 async function excluirProduto(id: number) {
  Alert.alert('Confirmação', 'Deseja excluir este produto?', [
    { text: 'Cancelar' },
    {
      text: 'Excluir',
      onPress: async () => {
        try {
          const token = await AsyncStorage.getItem("token");
          if (!token) {
            Alert.alert("Usuário não autenticado");
            return;
          }
          await axios.delete(`${API_URL}/deletar/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          carregarProdutos();
        } catch (error) {
          Alert.alert("Erro ao excluir produto");
          console.error(error);
        }
      },
    },
  ]);
}


  function preencherEdicao(produto: Produto) {
    setForm({
      nome: produto.nome,
      preco: produto.preco,
      categoria: produto.categoria,
      imagem: produto.imagem,
    });
    setEditandoId(produto.id);
  }

  return (
    <View className="flex-1 bg-white p-4">
      <Text className="text-xl font-bold mb-4">Cadastro de Produtos</Text>

      <TextInput
        placeholder="Nome"
        value={form.nome}
        onChangeText={(t) => setForm({ ...form, nome: t })}
        className="border p-2 mb-2 rounded"
      />
      <TextInput
        placeholder="Preço"
        keyboardType="numeric"
        value={String(form.preco)}
        onChangeText={(t) => setForm({ ...form, preco: parseFloat(t) || 0 })}
        className="border p-2 mb-2 rounded"
      />
      <TextInput
        placeholder="Categoria"
        value={form.categoria}
        onChangeText={(t) => setForm({ ...form, categoria: t })}
        className="border p-2 mb-2 rounded"
      />
      <TextInput
        placeholder="URL da Imagem"
        value={form.imagem}
        onChangeText={(t) => setForm({ ...form, imagem: t })}
        className="border p-2 mb-4 rounded"
      />

      <TouchableOpacity
        className="bg-blue-600 py-3 rounded mb-4"
        onPress={salvarProduto}
      >
        <Text className="text-white text-center font-bold">
          {editandoId ? 'Atualizar Produto' : 'Adicionar Produto'}
        </Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={produtos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View className="border-b py-2 flex-row justify-between items-center">
              <View>
                <Text className="font-bold">{item.nome}</Text>
                <Text>R$ {item.preco.toFixed(2)} - {item.categoria}</Text>
              </View>
              <View className="flex-row gap-2">
                <TouchableOpacity
                  className="bg-yellow-500 px-2 py-1 rounded"
                  onPress={() => preencherEdicao(item)}
                >
                  <Text className="text-white">Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="bg-red-600 px-2 py-1 rounded"
                  onPress={() => excluirProduto(item.id)}
                >
                  <Text className="text-white">Excluir</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}
