import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { RootStackParamList } from "../navigation";

type Props = NativeStackScreenProps<RootStackParamList, "welcome">;

export default function Welcome({ navigation }: Props) {
  return (
    <View className="flex-1 bg-[#8a1a18] relative">
      {/* Imagem de fundo */}
      <Image
        source={require("../assets/padoca.jpg")}
        className="w-full h-full absolute"
        resizeMode="contain"
      />

      {/* Overlay escura */}
      <View className="flex-1 justify-between items-center bg-black/5 px-5 pt-16 pb-10">
        {/* Texto no topo */}
        <View className="items-center pt-20">
          <Text className="text-white text-6xl font-bold text-center">
            Bem-vindo!
          </Text>
        </View>

        {/* Botões no rodapé */}
        <View className="w-full items-center mb-36">
          <TouchableOpacity
            className="bg-blue-600 py-3 px-8 rounded-lg mb-4"
            onPress={() => navigation.navigate("cadastro")}
          >
            <Text className="text-white text-base font-bold">
              Criar Conta
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("login")}
            className="py-2"
          >
            <Text className="text-white text-sm underline">
              Já tem cadastro? Faça login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
