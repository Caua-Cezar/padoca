import { Feather, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Modal, Pressable, Text, TouchableOpacity, View } from 'react-native';
import { RootStackParamList } from '../../navigation'; // ajuste conforme seu projeto

export function Header() {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View className="w-full flex flex-row items-center justify-between">
      {/* Botão de menu */}
      <Pressable
        onPress={() => setModalVisible(true)}
        className="w-10 h-10 bg-white rounded-full flex justify-center items-center"
      >
        <Ionicons name="menu" size={20} color="#121212" />
      </Pressable>

      {/* Modal com opção "Sobre nós" */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.3)',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            paddingTop: 60,
            paddingLeft: 20,
          }}
          activeOpacity={1}
          onPressOut={() => setModalVisible(false)}
        >
          <View className="bg-white rounded-md p-4 shadow-md">
            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
                navigation.navigate('sobre' as never); // sua rota para página "Sobre nós"
              }}
            >
              <Text className="text-black text-base">Sobre nós</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Centro - localização */}
      <View className="flex flex-col items-center justify-center">
        <Text className="text-center text-sm text-slate-800">Localização</Text>
        <View className="flex-row items-center justify-center gap-1">
          <Feather name="map-pin" size={14} color="#FF0000" />
          <Text className="text-lg font-bold">Campinas</Text>
        </View>
      </View>

      {/* Sininho de notificações */}
      <Pressable className="w-10 h-10 bg-white rounded-full flex justify-center items-center">
        <Feather name="bell" size={20} color="#121212" />
      </Pressable>
    </View>
  );
}
