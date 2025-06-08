import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import {
    ActivityIndicator,
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

type Props = NativeStackScreenProps<RootStackParamList, "login">;

export default function Login({ navigation }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    // Validação simples dos campos
    if (!email.trim() || !password.trim()) {
      Alert.alert("Erro", "Por favor, preencha email e senha.");
      return;
    }

    setLoading(true);

    try {
      // Substitua a URL abaixo pelo endpoint real da sua API de login
      const response = await fetch("https://suaapi.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        // Pode extrair a mensagem de erro da API, se houver
        const errorData = await response.json();
        throw new Error(errorData.message || "Erro no login");
      }

      const data = await response.json();
      console.log("Login realizado com sucesso:", data);

      // Aqui você pode salvar token / dados no AsyncStorage se quiser

      // Navega para a home após login com sucesso
      navigation.reset({
        index: 0,
        routes: [{ name: "home" }],
      });

    } catch (error: any) {
      Alert.alert("Erro no login", error.message);
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
        {/* Imagem de fundo */}
        <Image
          source={require("../assets/padoca.jpg")}
          className="w-full h-full absolute"
          resizeMode="contain"
        />

        {/* Overlay escura */}
        <View className="flex-1 justify-center items-center bg-black/50 px-5">
          <Text className="text-white text-4xl font-bold mb-10">
            Faça seu login
          </Text>

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
            value={password}
            onChangeText={setPassword}
            placeholder="Senha"
            placeholderTextColor="#ddd"
            secureTextEntry
            className="w-full bg-black/30 rounded-md px-4 py-3 mb-6 text-white"
            editable={!loading}
          />

          <TouchableOpacity
            className="bg-blue-600 py-3 w-full rounded-lg mb-6 flex-row justify-center items-center"
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text className="text-white font-bold text-center text-base">
                Entrar
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("cadastro")}
            className="py-2"
            disabled={loading}
          >
            <Text className="text-white text-sm underline">
              Ainda não tem conta? Cadastre-se
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
