// ...importações
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Constants from "expo-constants";
import React, { useEffect, useState } from "react";
import { Alert, Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native";

import { RootStackParamList } from "../navigation";

import { Banner } from "../components/banner";
import { Bebidas } from "../components/bebidas";
import { Bolos } from "../components/bolos";
import { Doces } from "../components/doces";
import { Header } from "../components/header";
import { Salgadinhos } from "../components/salgadinho";
import { Salgados } from "../components/salgados";
import { Search } from "../components/search/input";
import { Section } from "../components/section";
import { Trendingfoods } from "../components/trending";

const statusBarHeight = Constants.statusBarHeight;

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "home">;

export default function Home() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [tipoUsuario, setTipoUsuario] = useState<string | null>(null);

  useEffect(() => {
    async function getTipoUsuario() {
      const tipo = await AsyncStorage.getItem("tipoUsuario");
      setTipoUsuario(tipo);
    }
    getTipoUsuario();
  }, []);

  async function handleLogout() {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("tipoUsuario");
    navigation.reset({ index: 0, routes: [{ name: "login" }] });
  }

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ paddingBottom: 32 }}
      className="bg-slate-200"
      showsVerticalScrollIndicator={false}
    >
      <View
        className="w-full px-4 flex-row items-center gap-4"
        style={{ marginTop: statusBarHeight + 8 }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("perfil" as never)}
          className="bg-blue-600 px-3 py-2 rounded-md"
        >
          <Text className="text-white font-semibold">Perfil</Text>
        </TouchableOpacity>

        <View style={{ flex: 1, alignItems: "center" }}>
          <Header />
        </View>

        <TouchableOpacity
          onPress={() =>
            Alert.alert("Sair", "Deseja realmente sair?", [
              { text: "Cancelar", style: "cancel" },
              { text: "Sim", onPress: handleLogout },
            ])
          }
          className="bg-red-600 px-3 py-2 rounded-md"
        >
          <Text className="text-white font-semibold">Sair</Text>
        </TouchableOpacity>
      </View>

      <View className="w-full px-4">
        <Banner />
        <Search />

        {tipoUsuario === "admin" && (
          <>
            <TouchableOpacity
              className="bg-green-600 px-3 py-2 rounded-md mt-4"
              onPress={() => navigation.navigate("crudProdutos")}
            >
              <Text className="text-white font-semibold text-center">
                Gerenciar Produtos (CRUD)
              </Text>
            </TouchableOpacity>

            <View className="mt-5">
              <Text className="text-white text-lg font-bold mb-2">Painel do Administrador</Text>

              <Pressable
                className="bg-white py-3 px-5 rounded mb-2"
                onPress={() => navigation.navigate("listaUsuarios")}
              >
                <Text className="text-[#8a1a18] text-center font-semibold">
                  Ver Todos os Usuários
                </Text>
              </Pressable>

              <Pressable
                className="bg-white py-3 px-5 rounded"
                onPress={() => navigation.navigate("controleUsuarios")}
              >
                <Text className="text-[#8a1a18] text-center font-semibold">
                  Controle de Contas
                </Text>
              </Pressable>
            </View>
          </>
        )}
      </View>

      <Section
        name="Promoções no estabelecimento"
        label="veja ao lado"
        action={() => console.log("CLICOU NO VEJA MAIS")}
        size="text-lg"
      />
      <Trendingfoods />

      <Section
        name="Salgados"
        label="Arraste para lado"
        action={() => console.log("CLICOU NO VEJA MAIS")}
        size="text-lg"
      />
      <Salgados />

      <Section
        name="Salgadinhos"
        label="Arraste para lado"
        action={() => console.log("CLICOU NO VEJA MAIS")}
        size="text-lg"
      />
      <Salgadinhos />

      <Section
        name="bolos"
        label="Arraste para lado"
        action={() => console.log("CLICOU NO VEJA MAIS")}
        size="text-lg"
      />
      <Bolos />

      <Section
        name="doces"
        label="Arraste para lado"
        action={() => console.log("CLICOU NO VEJA MAIS")}
        size="text-lg"
      />
      <Doces />

      <Section
        name="bebidas"
        label="Arraste para lado"
        action={() => console.log("CLICOU NO VEJA MAIS")}
        size="text-lg"
      />
      <Bebidas />

      <View style={{ height: 32 }} />
    </ScrollView>
  );
}
