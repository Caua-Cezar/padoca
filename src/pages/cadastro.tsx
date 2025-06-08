import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import type { RootStackParamList } from "../navigation";

type CadastroScreenProp = NativeStackNavigationProp<RootStackParamList, "cadastro">;

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const navigation = useNavigation<CadastroScreenProp>();

  const handleCadastrar = () => {
    console.log("Cadastrar:", { nome, email, senha });
    navigation.reset({
      index: 0,
      routes: [{ name: "home" }],
    });
  };

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View className="flex-1 bg-[#8a1a18] relative">
        {/* Imagem de fundo */}
        <Image
          source={require("../assets/padoca.jpg")}
          className="w-full h-full absolute"
          resizeMode="contain"
        />

        {/* Overlay escura */}
        <View className="flex-1 justify-center items-center bg-black/50 px-5">
          <Text className="text-white text-4xl font-bold mb-10">
            Crie sua conta
          </Text>

          <TextInput
            value={nome}
            onChangeText={setNome}
            placeholder="Nome completo"
            placeholderTextColor="#ddd"
            className="w-full bg-black/30 rounded-md px-4 py-3 mb-4 text-white"
          />

          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="E-mail"
            placeholderTextColor="#ddd"
            keyboardType="email-address"
            autoCapitalize="none"
            className="w-full bg-black/30 rounded-md px-4 py-3 mb-4 text-white"
          />

          <TextInput
            value={senha}
            onChangeText={setSenha}
            placeholder="Senha"
            placeholderTextColor="#ddd"
            secureTextEntry
            className="w-full bg-black/30 rounded-md px-4 py-3 mb-6 text-white"
          />

          <TouchableOpacity
            onPress={handleCadastrar}
            className="bg-blue-600 py-3 w-full rounded-lg mb-6"
          >
            <Text className="text-white font-bold text-center text-base">
              Cadastrar
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("login")}
            className="py-2"
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
