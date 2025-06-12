import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Cadastro from "../pages/cadastro";
import ControleUsuarios from "../pages/controleUsuarios";
import EsqueciSenhaScreen from "../pages/esqueciSenha";
import Home from "../pages/home";
import ListaUsuarios from "../pages/listaUsuarios";
import Login from "../pages/login";
import Perfil from "../pages/perfil";
import ProdutosCrudScreen from "../pages/produtosCrud";
import RedefinirSenhaScreen from "../pages/redefinirSenha";
import Sobre from "../pages/sobre";
import Welcome from "../pages/welcome";

export type RootStackParamList = {
  welcome: undefined;
  cadastro: undefined;
  login: undefined;
  esqueciSenha: undefined;
  redefinirSenha: undefined;
  home: undefined;
  perfil: undefined;
  sobre: undefined;
  crudProdutos: undefined;
  listaUsuarios: undefined;
  controleUsuarios: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Routes() {
  return (
    <Stack.Navigator
      initialRouteName="welcome"   // <<<<< aqui, deve ser "welcome"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="welcome" component={Welcome} />
      <Stack.Screen name="cadastro" component={Cadastro} />
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="esqueciSenha" component={EsqueciSenhaScreen} />
      <Stack.Screen name="redefinirSenha" component={RedefinirSenhaScreen} />
      <Stack.Screen name="home" component={Home} />
      <Stack.Screen name="perfil" component={Perfil} />
      <Stack.Screen name="sobre" component={Sobre} />
      <Stack.Screen name="crudProdutos" component={ProdutosCrudScreen} />
      <Stack.Screen name="listaUsuarios" component={ListaUsuarios} />
      <Stack.Screen name="controleUsuarios" component={ControleUsuarios} />
    </Stack.Navigator>
  );
}
