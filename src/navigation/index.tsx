import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Cadastro from "../pages/cadastro";
import Home from "../pages/home";
import Login from "../pages/login";
import Welcome from "../pages/welcome";

export type RootStackParamList = {
  welcome: undefined;
  cadastro: undefined;
  login: undefined;
  home: undefined;
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
      <Stack.Screen name="home" component={Home} />
    </Stack.Navigator>
  );
}
