import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { RootStackParamList } from "../navigation";

type Props = NativeStackScreenProps<RootStackParamList, "perfil">;

export default function Perfil({ navigation }: Props) {
  const [nome, setNome] = useState("");
  const [contato, setContato] = useState("");
  const [fotoUrl, setFotoUrl] = useState<string | null>(null); // exibição
  const [fotoBase64, setFotoBase64] = useState<string | null>(null); // envio
  const [carregando, setCarregando] = useState(true);

  async function carregarPerfil() {
    try {
      const token = await AsyncStorage.getItem("token");
      const res = await fetch("http://192.168.1.107:3333/perfil/meu-perfil", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      setNome(data.nome || "");
      setContato(data.contato || "");
      const urlFoto = data.foto
        ? `http://192.168.1.107:3333${data.foto}`
        : null;
      setFotoUrl(urlFoto);

    } catch (err) {
      Alert.alert("Erro", "Não foi possível carregar os dados.");
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarPerfil();
  }, []);

  async function escolherFoto() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      base64: true,
      quality: 0.5,
    });

    if (!result.canceled) {
      const asset = result.assets[0];
      const base64 = asset.base64;
      const tipo = asset.uri.split(".").pop() || "jpg";
      const base64String = `data:image/${tipo};base64,${base64}`;
      setFotoBase64(base64String);     // para enviar
      setFotoUrl(base64String);        // para exibir
    }
  }

  async function salvarPerfil() {
    try {
      const token = await AsyncStorage.getItem("token");

      const payload = {
        nome,
        contato,
        foto: fotoBase64, // só envia se foi escolhida nova
      };

      const res = await fetch("http://192.168.1.107:3333/perfil/atualizar", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Erro ao atualizar perfil");
      }

      Alert.alert("Sucesso", "Perfil atualizado com sucesso!", [
        {
          text: "OK",
          onPress: () => navigation.navigate("home"),
        },
      ]);
    } catch (err) {
      Alert.alert("Erro", "Não foi possível salvar o perfil.");
    }
  }

  if (carregando) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" />
      </View>
    );
  }

 return (
  <View className="flex-1 bg-[#8a1a18] p-5 justify-center items-center">
    <Text className="text-2xl font-bold mb-5 text-white">Meu Perfil</Text>

    <TouchableOpacity
      onPress={escolherFoto}
      className="mb-4 w-32 h-32 rounded-full bg-gray-200 overflow-hidden"
    >
      {fotoUrl ? (
        <Image
          source={{ uri: fotoUrl }}
          className="w-full h-full"
          resizeMode="cover"
        />
      ) : (
        <Text className="text-center text-gray-500 mt-12">Escolher foto</Text>
      )}
    </TouchableOpacity>

    {fotoUrl && (
      <TouchableOpacity
        className="mt-2"
        onPress={() => {
          setFotoUrl(null);
          setFotoBase64(null);
        }}
      >
        <Text className="text-red-500 underline">Remover foto</Text>
      </TouchableOpacity>
    )}

    <TextInput
      className="border border-gray-300 rounded px-3 py-2 mb-4 w-full max-w-xs bg-white text-black"
      placeholder="Nome completo"
      value={nome}
      onChangeText={setNome}
      editable={false}
    />

    <TextInput
      className="border border-gray-300 rounded px-3 py-2 mb-4 w-full max-w-xs bg-white text-black"
      placeholder="WhatsApp"
      keyboardType="phone-pad"
      value={contato}
      onChangeText={setContato}
    />

    <TouchableOpacity
      className="bg-blue-600 py-3 rounded items-center w-full max-w-xs"
      onPress={salvarPerfil}
    >
      <Text className="text-white font-bold text-center">Salvar Alterações</Text>
    </TouchableOpacity>
  </View>
);
}