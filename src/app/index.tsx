import { ScrollView, View } from "react-native";

import Constants from 'expo-constants';
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

export default function Index() {
  return (
    <ScrollView 
    style={{flex: 1}} 
    className="bg-slate-200"
    showsVerticalScrollIndicator={false} 
    >
      <View className="w-full px-4" style={{ marginTop: statusBarHeight + 8 }}>
        <Header/>

        <Banner/>

        <Search/>

      </View>

      <Section 
        name="Promoções no estabelecimento"
        label="veja ao lado"
        action={ () => console.log("CLICOU NO VEJA MAIS")}
        size="text-lg"
      />
      <Trendingfoods/>

      <Section 
        name="Salgados"
        label="Arraste para lado"
        action={ () => console.log("CLICOU NO VEJA MAIS")}
        size="text-lg"
      />
      <Salgados/>

      <Section 
        name="Salgadinhos"
        label="Arraste para lado"
        action={ () => console.log("CLICOU NO VEJA MAIS")}
        size="text-lg"
      />
      <Salgadinhos/>

      <Section 
        name="bolos"
        label="Arraste para lado"
        action={ () => console.log("CLICOU NO VEJA MAIS")}
        size="text-lg"
      />
      <Bolos/>

      <Section 
        name="doces"
        label="Arraste para lado"
        action={ () => console.log("CLICOU NO VEJA MAIS")}
        size="text-lg"
      />
      <Doces/>

      <Section 
        name="bebidas"
        label="Arraste para lado"
        action={ () => console.log("CLICOU NO VEJA MAIS")}
        size="text-lg"
      />
      <Bebidas/>
      

    </ScrollView>
  );
}
