import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { RootStackParamList } from "../navigation";
import { criarPerfil, register } from "../services/api";

type Props = NativeStackScreenProps<RootStackParamList, "cadastro">;

export default function Cadastro({ navigation }: Props) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [telefone, setTelefone] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleCadastrar() {
  if (!nome.trim() || !email.trim() || !senha.trim() || !telefone.trim()) {
    Alert.alert("Erro", "Preencha todos os campos.");
    return;
  }

  setLoading(true);
  try {
    console.log("Tentando registrar usuário...");
    const reg = await register(email, senha);
    console.log("Resposta register:", reg);

    if (reg.token) {
      await AsyncStorage.setItem("token", reg.token);

      console.log("Criando perfil...");
      const perfil = await criarPerfil(reg.token, nome, telefone, "");
      console.log("Resposta criarPerfil:", perfil);

      if (perfil.id) {
        navigation.reset({ index: 0, routes: [{ name: "home" }] });
      } else {
        Alert.alert("Erro", "Não foi possível criar o perfil.");
      }
    } else {
      Alert.alert("Erro", reg.message || "Falha no cadastro");
    }
  } catch (error) {
    console.error("Erro no cadastro:", error);
    Alert.alert("Erro", "Erro ao tentar cadastrar.");
  } finally {
    setLoading(false);
  }
}


  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View className="flex-1 bg-[#8a1a18] relative">
        <Image
          source={require("../assets/padoca.jpg")}
          className="w-full h-full absolute"
          resizeMode="contain"
        />
        <View className="flex-1 justify-center items-center bg-black/50 px-5">
          <Text className="text-white text-4xl font-bold mb-10">Cadastro</Text>

          <TextInput
            value={nome}
            onChangeText={setNome}
            placeholder="Nome Completo"
            placeholderTextColor="#ddd"
            className="w-full bg-black/30 rounded-md px-4 py-3 mb-4 text-white"
            editable={!loading}
          />
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            placeholderTextColor="#ddd"
            keyboardType="email-address"
            autoCapitalize="none"
            className="w-full bg-black/30 rounded-md px-4 py-3 mb-4 text-white"
            editable={!loading}
          />
          <TextInput
            value={senha}
            onChangeText={setSenha}
            placeholder="Senha"
            placeholderTextColor="#ddd"
            secureTextEntry
            className="w-full bg-black/30 rounded-md px-4 py-3 mb-4 text-white"
            editable={!loading}
          />
          <TextInput
            value={telefone}
            onChangeText={setTelefone}
            placeholder="Telefone (DD + Número)"
            placeholderTextColor="#ddd"
            keyboardType="phone-pad"
            className="w-full bg-black/30 rounded-md px-4 py-3 mb-6 text-white"
            editable={!loading}
          />

          <TouchableOpacity
            onPress={handleCadastrar}
            disabled={loading}
            className="bg-blue-600 py-3 w-full rounded-lg mb-6 flex-row justify-center items-center"
          >
            <Text className="text-white font-bold text-center text-base">
              {loading ? "Carregando..." : "Cadastrar"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("login")}
            className="py-2"
            disabled={loading}
          >
            <Text className="text-white text-sm underline">
              Já tem conta? Faça login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
